import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

export async function GET() {
  const headersList = headers()
  
  // Try different headers to get the real IP address
  const ip = headersList.get('x-forwarded-for') || 
             headersList.get('x-real-ip') ||
             '127.0.0.1' // fallback for local development

  return NextResponse.json({ ip })
}
