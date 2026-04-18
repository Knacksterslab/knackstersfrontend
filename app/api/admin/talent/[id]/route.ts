import { NextRequest, NextResponse } from 'next/server';

import { BACKEND_URL } from '@/lib/config/env';

/**
 * GET /api/admin/talent/[id]
 * Get single talent application
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const talentId = params.id;
    
    const response = await fetch(`${BACKEND_URL}/api/admin/talent/${talentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Get talent profile error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch talent profile' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/talent/[id]
 * Update talent application status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const talentId = params.id;
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/api/admin/talent/${talentId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Update talent status error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update talent status' },
      { status: 500 }
    );
  }
}
