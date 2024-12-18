import { NextRequest, NextResponse } from "next/server";

// Mock Database
const users: { email: string; password: string }[] = [];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 },
      );
    }

    // Cek jika email sudah terdaftar
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered." },
        { status: 409 },
      );
    }

    // Simpan user baru (Mock)
    users.push({ email, password }); // Note: Di produksi, password harus di-hash

    // Response sukses
    return NextResponse.json(
      {
        success: true,
        message: "Registration successful!",
        data: { email },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 },
    );
  }
}
