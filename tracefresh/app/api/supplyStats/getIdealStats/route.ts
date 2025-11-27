import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    idealStats: {
      temperature: '20-22°C',
      humidity: '50-60%',
      shock: 'Low',
    },
  });
}
