/**
 * Manager Data Transformers
 * Transforms backend data structures to match frontend component expectations
 */

import { formatDistanceToNow } from 'date-fns';

// Backend types (matching Prisma schema)
interface BackendClient {
  id: string;
  email: string;
  fullName: string | null;
  companyName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  status: string;
  createdAt: Date;
  subscriptions: Array<{
    plan: string;
    status: string;
    monthlyHours?: number;
    priceAmount?: number;
  }>;
  hoursBalances: Array<{
    allocatedHours: number;
    bonusHours: number;
    extraPurchasedHours: number;
    hoursUsed: any; // Decimal from Prisma
    rolloverHours: any; // Decimal from Prisma
    periodStart: Date;
    periodEnd: Date;
  }>;
  _count: {
    clientProjects: number;
  };
}

// Frontend types (what components expect)
export interface TransformedClient {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'low-minutes' | 'inactive';
  subscription: string;
  minutesPurchased: number;
  minutesUsed: number;
  minutesAvailable: number;
  activeProjects: number;
  projects: any[]; // Will be loaded on expand
  avatarUrl: string | null;
  memberSince: string;
}

/**
 * Get client status based on hours balance and subscription
 */
function getClientStatus(client: BackendClient): 'active' | 'low-minutes' | 'inactive' {
  const currentBalance = client.hoursBalances[0];
  const subscription = client.subscriptions[0];

  if (!currentBalance || !subscription || subscription.status !== 'ACTIVE') {
    return 'inactive';
  }

  const totalHours =
    currentBalance.allocatedHours +
    currentBalance.bonusHours +
    currentBalance.extraPurchasedHours +
    Number(currentBalance.rolloverHours);
  const usedHours = Number(currentBalance.hoursUsed);
  const remainingPercentage = totalHours > 0 ? ((totalHours - usedHours) / totalHours) * 100 : 0;

  if (remainingPercentage < 20) return 'low-minutes';
  return 'active';
}

/**
 * Transform backend client data to frontend format
 */
export function transformClientData(client: BackendClient): TransformedClient {
  const currentBalance = client.hoursBalances[0];
  const subscription = client.subscriptions[0];

  // Calculate total hours
  const totalHours = currentBalance
    ? currentBalance.allocatedHours +
      currentBalance.bonusHours +
      currentBalance.extraPurchasedHours +
      Number(currentBalance.rolloverHours)
    : 0;

  const usedHours = currentBalance ? Number(currentBalance.hoursUsed) : 0;
  const remainingHours = totalHours - usedHours;

  // Convert hours to minutes for display (some components may prefer minutes)
  const totalMinutes = totalHours * 60;
  const usedMinutes = usedHours * 60;
  const remainingMinutes = remainingHours * 60;

  return {
    id: client.id,
    name: client.fullName || 'Unnamed Client',
    company: client.companyName || 'No company',
    email: client.email,
    phone: client.phone || 'No phone',
    status: getClientStatus(client),
    subscription: subscription?.plan || 'No subscription',
    minutesPurchased: totalMinutes,
    minutesUsed: usedMinutes,
    minutesAvailable: remainingMinutes,
    activeProjects: client._count.clientProjects,
    projects: [], // Will be loaded separately
    avatarUrl: client.avatarUrl,
    memberSince: formatDistanceToNow(new Date(client.createdAt), { addSuffix: true }),
  };
}

/**
 * Calculate monthly stats from client data
 */
export function calculateMonthlyStats(clients: BackendClient[]) {
  const totalHoursLogged = clients.reduce((sum, client) => {
    const balance = client.hoursBalances[0];
    return sum + (balance ? Number(balance.hoursUsed) : 0);
  }, 0);

  const totalHoursPurchased = clients.reduce((sum, client) => {
    const balance = client.hoursBalances[0];
    if (!balance) return sum;
    return (
      sum +
      balance.allocatedHours +
      balance.bonusHours +
      balance.extraPurchasedHours +
      Number(balance.rolloverHours)
    );
  }, 0);

  const activeClients = clients.filter((client) => {
    const subscription = client.subscriptions[0];
    return subscription?.status === 'ACTIVE';
  }).length;

  // Calculate average hourly rate from subscriptions
  const subscriptionsWithRate = clients
    .map((c) => c.subscriptions[0])
    .filter((s) => s && s.priceAmount && s.monthlyHours);

  const avgHourlyRate =
    subscriptionsWithRate.length > 0
      ? subscriptionsWithRate.reduce((sum, s) => {
          return sum + Number(s.priceAmount) / s.monthlyHours!;
        }, 0) / subscriptionsWithRate.length
      : 0;

  // Estimate revenue (hours used * average rate)
  const estimatedRevenue = Math.round(totalHoursLogged * avgHourlyRate);

  return {
    totalRevenue: estimatedRevenue,
    totalHoursLogged: Math.round(totalHoursLogged),
    totalHoursPurchased: Math.round(totalHoursPurchased),
    activeClients,
    avgHourlyRate: Math.round(avgHourlyRate),
    utilizationRate:
      totalHoursPurchased > 0 ? Math.round((totalHoursLogged / totalHoursPurchased) * 100) : 0,
  };
}

/**
 * Transform meeting data for display
 */
export function transformMeetingData(meeting: any) {
  return {
    id: meeting.id,
    clientName: meeting.client?.fullName || meeting.client?.companyName || 'Unknown Client',
    clientEmail: meeting.client?.email,
    type: meeting.type,
    title: meeting.title,
    scheduledAt: new Date(meeting.scheduledAt),
    durationMinutes: meeting.durationMinutes,
    videoUrl: meeting.videoRoomUrl,
    status: meeting.status,
  };
}

/**
 * Get initials from name
 */
export function getInitials(name: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format hours and minutes
 */
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) {
    return `${hours}h ${mins}m`;
  }
  if (hours > 0) {
    return `${hours} hrs`;
  }
  return `${mins} min`;
}

/**
 * Get status color classes
 */
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    'low-minutes': 'bg-orange-100 text-orange-700',
    inactive: 'bg-gray-100 text-gray-700',
    ACTIVE: 'bg-green-100 text-green-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    IN_REVIEW: 'bg-purple-100 text-purple-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
    SCHEDULED: 'bg-blue-100 text-blue-700',
  };

  return statusMap[status] || 'bg-gray-100 text-gray-700';
}

/**
 * Get priority color classes
 */
export function getPriorityColor(priority: string): string {
  const priorityMap: Record<string, string> = {
    LOW: 'bg-green-100 text-green-700',
    MEDIUM: 'bg-yellow-100 text-yellow-700',
    HIGH: 'bg-orange-100 text-orange-700',
    URGENT: 'bg-red-100 text-red-700',
  };

  return priorityMap[priority] || 'bg-gray-100 text-gray-700';
}
