export async function POST(req: Request) {
  console.log("Mock API hit for register endpoint!");

  const body = await req.json();
  console.log("Request body:", body);

  const mockResponse = {
    success: true,
    message: "Registration successful!",
    data: {
      id: 1,
      email: body.email || "test@example.com",
      token: "mock-token-12345", 
    },
  };

  return new Response(JSON.stringify(mockResponse), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
