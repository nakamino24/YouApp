import { NextRequest, NextResponse } from 'next/server'

const mockUser = {
  email: 'johndoe@gmail.com',
  password: 'password123',
  token: 'mock-token-12345',
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      )
    }

    if (email !== mockUser.email || password !== mockUser.password) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Login successful!',
        data: {
          token: mockUser.token,
          user: { email: mockUser.email, name: 'John Doe' },
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Login Error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
