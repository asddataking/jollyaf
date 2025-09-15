import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Log the booking data to console (replace with actual database storage later)
    console.log('New booking received:', {
      timestamp: new Date().toISOString(),
      ...body
    })
    
    // TODO: Add email notification to business owner
    // TODO: Add database storage
    // TODO: Add calendar integration
    
    return NextResponse.json({ 
      success: true, 
      message: 'Booking received successfully' 
    })
  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process booking' },
      { status: 500 }
    )
  }
}
