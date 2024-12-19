import { NextRequest, NextResponse } from 'next/server'
import { users } from '@/mockDatabase/mockDatabase' // Pastikan path sesuai dengan struktur Anda

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      )
    }

    // Cek data pengguna di database
    const user = users.find(
      (user) => user.email === email && user.password === password
    )

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      )
    }

    // Response sukses
    return NextResponse.json(
      {
        success: true,
        message: 'Login successful!',
        data: {
          token: 'mock-token-12345',
          user: { name: user.name, email: user.email },
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
