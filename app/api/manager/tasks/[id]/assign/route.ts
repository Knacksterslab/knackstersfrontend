import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookies = request.headers.get('cookie') || '';
    const body = await request.json();

    const response = await fetch(
      `${BACKEND_URL}/api/manager/tasks/${params.id}/assign`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookies,
        },
        credentials: 'include',
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Manager task assign API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to assign task' },
      { status: 500 }
    );
  }
}
