import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Get the request body
    const data = await request.json()
    const { name, email } = data
    console.log(name, email)
    // Here you would typically save to a database
    // For demo, we'll just echo back the data
    return NextResponse.json({ 
      success: true, 
      user: { name, email } 
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 400 }
    )
  }
}