/**
 * API Client
 * Handles all API requests to the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// #region agent log
// Hypothesis B: Log the API_URL value at module initialization (client-side only)
if (typeof window !== 'undefined') {
  console.log('[DEBUG] API Client initialized', {
    API_URL,
    envVar: process.env.NEXT_PUBLIC_API_URL,
    fallbackUsed: !process.env.NEXT_PUBLIC_API_URL
  });
}
// #endregion

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Base fetch wrapper with credentials
 */
async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  // #region agent log
  // Hypothesis E: Log the actual URL being called before fetch
  console.log('[DEBUG] apiFetch called', {
    endpoint,
    API_URL,
    constructedUrl: url,
    method: options.method || 'GET'
  });
  // #endregion
  
  const headers: any = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `API Error: ${response.status}`);
  }

  return data;
}

/**
 * Dashboard API
 */
export const dashboardApi = {
  /**
   * Get dashboard overview
   */
  getOverview: async () => {
    return apiFetch<ApiResponse>('/api/client/dashboard/overview');
  },

  /**
   * Get dashboard stats
   */
  getStats: async () => {
    return apiFetch<ApiResponse>('/api/client/dashboard/stats');
  },
};

/**
 * Hours API
 */
export const hoursApi = {
  /**
   * Get current hours balance
   */
  getBalance: async () => {
    return apiFetch<ApiResponse>('/api/client/hours/balance');
  },
};

/**
 * Notifications API
 */
export const notificationsApi = {
  /**
   * Get all notifications
   */
  getAll: async (limit?: number) => {
    const query = limit ? `?limit=${limit}` : '';
    return apiFetch<ApiResponse>(`/api/client/notifications${query}`);
  },

  /**
   * Get unread notifications
   */
  getUnread: async () => {
    return apiFetch<ApiResponse>('/api/client/notifications/unread');
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async () => {
    return apiFetch<ApiResponse>('/api/client/notifications/mark-all-read', {
      method: 'PATCH',
    });
  },

  /**
   * Delete notification
   */
  delete: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/notifications/${id}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Projects API
 */
export const projectsApi = {
  /**
   * Get all projects
   */
  getAll: async (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return apiFetch<ApiResponse>(`/api/client/projects${query}`);
  },

  /**
   * Get single project
   */
  getById: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/projects/${id}`);
  },

  /**
   * Create project
   */
  create: async (data: any) => {
    return apiFetch<ApiResponse>('/api/client/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update project
   */
  update: async (id: string, data: any) => {
    return apiFetch<ApiResponse>(`/api/client/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete project
   */
  delete: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/projects/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Get project stats
   */
  getStats: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/projects/${id}/stats`);
  },

  /**
   * Get project tasks
   */
  getTasks: async (id: string, status?: string) => {
    const query = status ? `?status=${status}` : '';
    return apiFetch<ApiResponse>(`/api/client/projects/${id}/tasks${query}`);
  },
};

/**
 * Tasks API
 */
export const tasksApi = {
  /**
   * Get all tasks
   */
  getAll: async (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return apiFetch<ApiResponse>(`/api/client/tasks${query}`);
  },

  /**
   * Get single task
   */
  getById: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/tasks/${id}`);
  },

  /**
   * Create task
   */
  create: async (data: any) => {
    return apiFetch<ApiResponse>('/api/client/tasks', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update task
   */
  update: async (id: string, data: any) => {
    return apiFetch<ApiResponse>(`/api/client/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update task status
   */
  updateStatus: async (id: string, status: string) => {
    return apiFetch<ApiResponse>(`/api/client/tasks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  /**
   * Delete task
   */
  delete: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Log time on task
   */
  logTime: async (id: string, data: { minutes: number; date?: string; description?: string }) => {
    return apiFetch<ApiResponse>(`/api/client/tasks/${id}/time`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Assign task to user
   */
  assign: async (id: string, userId: string) => {
    return apiFetch<ApiResponse>(`/api/client/tasks/${id}/assign`, {
      method: 'PATCH',
      body: JSON.stringify({ userId }),
    });
  },
};

/**
 * Time Logs API
 */
export const timeApi = {
  /**
   * Update time log
   */
  update: async (timeLogId: string, data: any) => {
    return apiFetch<ApiResponse>(`/api/client/time/${timeLogId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete time log
   */
  delete: async (timeLogId: string) => {
    return apiFetch<ApiResponse>(`/api/client/time/${timeLogId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Billing API
 */
export const billingApi = {
  /**
   * Get billing summary
   */
  getSummary: async () => {
    return apiFetch<ApiResponse>('/api/client/billing/summary');
  },

  /**
   * Get all invoices
   */
  getInvoices: async (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return apiFetch<ApiResponse>(`/api/client/billing/invoices${query}`);
  },

  /**
   * Get single invoice
   */
  getInvoice: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/billing/invoices/${id}`);
  },

  /**
   * Purchase extra hours
   */
  purchaseExtraHours: async (hours: number, paymentMethodId?: string) => {
    return apiFetch<ApiResponse>('/api/client/billing/extra-hours', {
      method: 'POST',
      body: JSON.stringify({ hours, paymentMethodId }),
    });
  },

  /**
   * Pay invoice
   */
  payInvoice: async (id: string, paymentMethodId?: string) => {
    return apiFetch<ApiResponse>(`/api/client/billing/invoices/${id}/pay`, {
      method: 'POST',
      body: JSON.stringify({ paymentMethodId }),
    });
  },

  /**
   * Get payment history
   */
  getPaymentHistory: async (limit?: number) => {
    const query = limit ? `?limit=${limit}` : '';
    return apiFetch<ApiResponse>(`/api/client/billing/history${query}`);
  },

  /**
   * Get current subscription
   */
  getSubscription: async () => {
    return apiFetch<ApiResponse>('/api/client/billing/subscription');
  },

  /**
   * Upgrade subscription
   */
  upgradeSubscription: async (newPlan: string) => {
    return apiFetch<ApiResponse>('/api/client/billing/subscription/upgrade', {
      method: 'POST',
      body: JSON.stringify({ newPlan }),
    });
  },

  /**
   * Cancel subscription
   */
  cancelSubscription: async (reason?: string) => {
    return apiFetch<ApiResponse>('/api/client/billing/subscription/cancel', {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  /**
   * Download invoice
   */
  downloadInvoice: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/billing/invoices/${id}/download`);
  },
};

/**
 * Meetings API
 */
export const meetingsApi = {
  /**
   * Get all meetings
   */
  getAll: async (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return apiFetch<ApiResponse>(`/api/client/meetings${query}`);
  },

  /**
   * Get upcoming meetings
   */
  getUpcoming: async (limit?: number) => {
    const query = limit ? `?limit=${limit}` : '';
    return apiFetch<ApiResponse>(`/api/client/meetings/upcoming${query}`);
  },

  /**
   * Get single meeting
   */
  getById: async (id: string) => {
    return apiFetch<ApiResponse>(`/api/client/meetings/${id}`);
  },

  /**
   * Create/schedule meeting
   */
  create: async (data: any) => {
    return apiFetch<ApiResponse>('/api/client/meetings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update meeting
   */
  update: async (id: string, data: any) => {
    return apiFetch<ApiResponse>(`/api/client/meetings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Reschedule meeting
   */
  reschedule: async (id: string, newScheduledAt: string, reason?: string) => {
    return apiFetch<ApiResponse>(`/api/client/meetings/${id}/reschedule`, {
      method: 'PATCH',
      body: JSON.stringify({ newScheduledAt, reason }),
    });
  },

  /**
   * Cancel meeting
   */
  cancel: async (id: string, reason?: string) => {
    return apiFetch<ApiResponse>(`/api/client/meetings/${id}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });
  },

  /**
   * Complete meeting
   */
  complete: async (id: string, notes?: string) => {
    return apiFetch<ApiResponse>(`/api/client/meetings/${id}/complete`, {
      method: 'PATCH',
      body: JSON.stringify({ notes }),
    });
  },

  /**
   * Get calendar view
   */
  getCalendarView: async (month: number, year: number) => {
    return apiFetch<ApiResponse>(`/api/client/meetings/calendar?month=${month}&year=${year}`);
  },

  /**
   * Get available time slots
   */
  getAvailableSlots: async (accountManagerId: string, date: string, durationMinutes: number) => {
    const params = new URLSearchParams({
      accountManagerId,
      date,
      durationMinutes: durationMinutes.toString(),
    });
    return apiFetch<ApiResponse>(`/api/client/meetings/slots/available?${params}`);
  },
};

/**
 * Talent API
 */
export const talentApi = {
  /**
   * Get talent dashboard
   */
  getDashboard: async () => {
    return apiFetch<ApiResponse>('/api/talent/dashboard');
  },

  /**
   * Get earnings summary
   */
  getEarnings: async () => {
    return apiFetch<ApiResponse>('/api/talent/earnings');
  },

  /**
   * Get talent stats
   */
  getStats: async () => {
    return apiFetch<ApiResponse>('/api/talent/stats');
  },

  /**
   * Get assigned projects
   */
  getProjects: async () => {
    return apiFetch<ApiResponse>('/api/talent/projects');
  },

  /**
   * Get time logs
   */
  getTimeLogs: async (filters?: {
    startDate?: string;
    endDate?: string;
    projectId?: string;
    taskId?: string;
  }) => {
    const params = new URLSearchParams(filters as any);
    return apiFetch<ApiResponse>(`/api/talent/time-logs?${params}`);
  },
};

/**
 * Manager API
 */
export const managerApi = {
  /**
   * Get manager dashboard
   */
  getDashboard: async () => {
    return apiFetch<ApiResponse>('/api/manager/dashboard');
  },

  /**
   * Get assigned clients
   */
  getClients: async () => {
    return apiFetch<ApiResponse>('/api/manager/clients');
  },

  /**
   * Get client details
   */
  getClientDetails: async (clientId: string) => {
    return apiFetch<ApiResponse>(`/api/manager/clients/${clientId}`);
  },

  /**
   * Get all projects for manager's clients
   */
  getProjects: async (status?: string) => {
    const query = status ? `?status=${status}` : '';
    return apiFetch<ApiResponse>(`/api/manager/projects${query}`);
  },

  /**
   * Get all tasks for manager's clients
   */
  getTasks: async (filters?: {
    status?: string;
    clientId?: string;
    projectId?: string;
  }) => {
    const params = new URLSearchParams(filters as any);
    return apiFetch<ApiResponse>(`/api/manager/tasks?${params}`);
  },

  /**
   * Get manager stats
   */
  getStats: async () => {
    return apiFetch<ApiResponse>('/api/manager/stats');
  },

  /**
   * Get available talent
   */
  getAvailableTalent: async () => {
    return apiFetch<ApiResponse>('/api/manager/talent');
  },
};

/**
 * Admin API
 */
export const adminApi = {
  /**
   * Check admin authentication status
   * Verifies user has valid SuperTokens session with ADMIN role
   */
  checkStatus: async () => {
    return apiFetch<ApiResponse>('/api/admin/auth/status');
  },

  /**
   * Get platform statistics
   */
  getStats: async () => {
    return apiFetch<ApiResponse>('/api/admin/stats');
  },

  /**
   * Get all users with filters
   */
  getUsers: async (filters?: {
    role?: string;
    status?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }) => {
    const params = new URLSearchParams(filters as any);
    return apiFetch<ApiResponse>(`/api/admin/users?${params}`);
  },

  /**
   * Get user details
   */
  getUserDetails: async (userId: string) => {
    return apiFetch<ApiResponse>(`/api/admin/users/${userId}`);
  },

  /**
   * Create user (ADMIN, MANAGER, or TALENT only)
   */
  createUser: async (data: {
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'MANAGER' | 'TALENT';
  }) => {
    return apiFetch<ApiResponse>('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update user
   */
  updateUser: async (userId: string, data: any) => {
    return apiFetch<ApiResponse>(`/api/admin/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update user role
   */
  updateUserRole: async (userId: string, role: string) => {
    return apiFetch<ApiResponse>(`/api/admin/users/${userId}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role }),
    });
  },

  /**
   * Toggle user status (activate/deactivate)
   */
  toggleUserStatus: async (userId: string, active: boolean) => {
    return apiFetch<ApiResponse>(`/api/admin/users/${userId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ active }),
    });
  },

  /**
   * Delete user
   */
  deleteUser: async (userId: string) => {
    return apiFetch<ApiResponse>(`/api/admin/users/${userId}`, {
      method: 'DELETE',
    });
  },

  /**
   * Assign account manager to client
   */
  assignAccountManager: async (userId: string, managerId: string) => {
    return apiFetch<ApiResponse>(`/api/admin/users/${userId}/assign-manager`, {
      method: 'POST',
      body: JSON.stringify({ managerId }),
    });
  },

  /**
   * Get activity logs
   */
  getActivities: async (filters?: {
    userId?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) => {
    const params = new URLSearchParams(filters as any);
    return apiFetch<ApiResponse>(`/api/admin/activities?${params}`);
  },

  /**
   * Get activity statistics
   */
  getActivityStats: async (userId?: string) => {
    const query = userId ? `?userId=${userId}` : '';
    return apiFetch<ApiResponse>(`/api/admin/activities/stats${query}`);
  },

  /**
   * Content Management - Get landing hero / talent cards
   */
  getLandingHero: async () => {
    return apiFetch<ApiResponse>('/api/admin/pages/landing-hero');
  },

  /**
   * Content Management - Update landing hero / talent cards
   */
  updateLandingHero: async (talentCards: Array<{
    id: string;
    image: string;
    name: string;
    role: string;
  }>) => {
    return apiFetch<ApiResponse>('/api/admin/pages/landing-hero', {
      method: 'PUT',
      body: JSON.stringify({ talentCards }),
    });
  },

  /**
   * Upload file (images for partners, talent, etc)
   */
  uploadFile: async (file: File, destination: 'partners' | 'talent' = 'talent') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('destination', destination);
    
    const response = await fetch(`${API_URL}/api/admin/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error('Upload failed');
    }
    
    return response.json();
  },
};

/**
 * Auth API (SuperTokens)
 */
export const authApi = {
  /**
   * Sign up
   */
  signUp: async (formFields: Array<{ id: string; value: string }>) => {
    return apiFetch<ApiResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ formFields }),
    });
  },

  /**
   * Sign in
   */
  signIn: async (formFields: Array<{ id: string; value: string }>) => {
    return apiFetch<ApiResponse>('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ formFields }),
    });
  },

  /**
   * Sign out
   */
  signOut: async () => {
    return apiFetch<ApiResponse>('/api/auth/signout', {
      method: 'POST',
    });
  },

  /**
   * Get session info
   */
  getSession: async () => {
    return apiFetch<ApiResponse>('/api/auth/session');
  },
};

/**
 * Talent Application API (Public - no auth required)
 */
export const talentApplicationApi = {
  /**
   * Submit talent application (Step 1)
   */
  apply: async (data: {
    firstName: string;
    lastName: string;
    email: string;
    primaryExpertise: string;
    additionalSkills?: string;
    profileUrls?: string[];
    currentEmploymentStatus: string;
    preferredWorkType: string;
    hourlyRate: number;
  }) => {
    return apiFetch<ApiResponse>('/api/public/talent/apply', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Schedule meeting (Step 2)
   */
  schedule: async (data: {
    profileId: string;
    preferredMeetingTime: string;
    meetingNotes?: string;
  }) => {
    return apiFetch<ApiResponse>('/api/public/talent/schedule', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};
