let mockProfile = {
  id: 1,
  name: "John Doe",
  email: "johndoe@gmail.com",
  birthday: "1990-01-01",
  height: 180,
  weight: 75,
  bio: "This is my bio, introducing myself!", 
  interests: ["Coding", "Music", "Gaming"],
};

export async function GET(req: Request) {
    console.log("Mock API hit for GET /api/profile");
  
    const token = req.headers.get("x-access-token"); 
  
    if (!token || token !== "mock-token-12345") {
      return new Response(
        JSON.stringify({ success: false, message: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  
    return new Response(
      JSON.stringify({ success: true, data: mockProfile }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
}
  
export async function PUT(req: Request) {
  console.log("Mock API hit for PUT /api/profile");

  const token = req.headers.get("x-access-token");

  if (!token || token !== "mock-token-12345") {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const updatedProfile = {
      ...mockProfile,
      ...body,
      bio: body.bio || "No bio available.",
      interests: body.interests?.length ? body.interests : ["No interests available."],
    };

    mockProfile = updatedProfile;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Profile updated successfully",
        data: mockProfile,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in PUT /api/profile:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to update profile" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
  