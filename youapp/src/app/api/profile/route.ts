import { NextRequest, NextResponse } from 'next/server'

// Mocked User Profile Data
let mockUserProfile = {
  id: 1,
  email: 'johndoe@gmail.com',
  name: 'John Doe',
  about: "Add in your 'About' to help others know you better.",
  birthday: '1995-08-28',
  horoscope: 'Virgo',
  zodiac: 'Pig',
  height: 175,
  weight: 69,
  interests: ['Coding', 'Traveling'],
}

// **GET**: Mengambil Data Profil
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('x-access-token')
    if (!token || token !== 'mock-token-12345') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: true, data: mockUserProfile },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    )
  }
}

// **PUT**: Memperbarui Data Profil
export async function PUT(req: NextRequest) {
  try {
    const token = req.headers.get('x-access-token')
    if (!token || token !== 'mock-token-12345') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { interests, ...otherData } = body

    // Jika hanya `interests` yang dikirim
    if (interests && Object.keys(otherData).length === 0) {
      mockUserProfile = {
        ...mockUserProfile,
        interests: interests || mockUserProfile.interests,
      }

      return NextResponse.json({
        success: true,
        message: 'Interests updated successfully.',
        data: mockUserProfile,
      })
    }

    // Validasi input untuk update atribut lainnya
    const { name, about, birthday, height, weight, horoscope, zodiac } =
      otherData

    if (!name || !birthday || !height || !weight) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name, birthday, height, and weight are required.',
        },
        { status: 400 }
      )
    }

    // Update data lengkap
    mockUserProfile = {
      ...mockUserProfile,
      name,
      about,
      birthday,
      height: Number(height),
      weight: Number(weight),
      interests: interests || mockUserProfile.interests,
      horoscope,
      zodiac,
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully.',
      data: mockUserProfile,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    )
  }
}
