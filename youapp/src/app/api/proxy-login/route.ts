export async function POST(req: Request) {
  console.log("Mock API hit for login endpoint!");

  const body = await req.json();
  const { email, password } = body;

  if (email === "johndoe@gmail.com" && password === "password123") {
    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful!",
        data: {
          token: "mock-token-12345",
          user: {
            id: 1,
            email: email,
            name: "John Doe",
          },
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid email or password",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
