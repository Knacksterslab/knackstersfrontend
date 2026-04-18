import { NextRequest, NextResponse } from 'next/server';

import { BACKEND_URL } from '@/lib/config/env';

/**
 * GET /api/admin/talent
 * Get all talent applications
 */
export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const url = `${BACKEND_URL}/api/admin/talent${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Talent applications GET error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch talent applications' },
      { status: 500 }
    );
  }
}
