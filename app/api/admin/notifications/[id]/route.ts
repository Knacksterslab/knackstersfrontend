import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * PATCH /api/admin/notifications/[id]/read
 * Mark a notification as read
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const notificationId = params.id;
    
    const response = await fetch(`${API_URL}/api/admin/notifications/${notificationId}/read`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Mark notification as read error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to mark notification as read' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/notifications/[id]
 * Delete a notification
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const notificationId = params.id;
    
    const response = await fetch(`${API_URL}/api/admin/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Delete notification error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete notification' },
      { status: 500 }
    );
  }
}
