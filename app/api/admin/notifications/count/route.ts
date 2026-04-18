import { NextRequest, NextResponse } from 'next/server';

import { BACKEND_URL } from '@/lib/config/env';

/**
 * GET /api/admin/notifications/count
 * Get unread notification count
 */
export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/admin/notifications/count`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Get notification count error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to get notification count' },
      { status: 500 }
    );
  }
}
