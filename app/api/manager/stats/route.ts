import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:5000';

export async function GET(request: NextRequest) {
  try {
    // Forward to backend with cookies
    const cookies = request.headers.get('cookie') || '';
    
    const response = await fetch(`${BACKEND_URL}/api/manager/stats`, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookies,
      },
      credentials: 'include',
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    console.error('Manager stats API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
