import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('profileImage')

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'No valid file uploaded' },
        { status: 400 }
      )
    }

    // Validate file MIME type (only allow images)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid file type' },
        { status: 400 }
      )
    }

    // Sanitize file name and generate unique name
    const extension = file.name.split('.').pop()
    const fileName = `${randomUUID()}.${extension}`
    const filePath = join(process.cwd(), 'public/uploads', fileName)

    // Save file to disk
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

    // Respond with file URL
    return NextResponse.json({
      success: true,
      imageUrl: `/uploads/${fileName}`,
    })
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
