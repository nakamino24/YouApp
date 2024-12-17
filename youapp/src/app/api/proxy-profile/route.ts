export async function GET(req: Request) {
    console.log("Mock API hit for profile endpoint!");
  
    const token = req.headers.get("Authorization"); 
  
    // Validasi token (opsional)
    if (!token || token !== "Bearer mock-token-12345") {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  
    // Simulasi respons data profil
    const mockProfile = {
      success: true,
      data: {
        id: 1,
        email: "johndoe@gmail.com",
        name: "John Doe",
        bio: "I am a software developer exploring new technologies.",
        interests: ["Coding", "Gaming", "Reading"],
      },
    };
  
    return new Response(JSON.stringify(mockProfile), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
}
  