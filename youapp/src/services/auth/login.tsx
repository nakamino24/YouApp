export async function login({ email, password }: { email: string; password: string }) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Service Login Error:", error);
    return { success: false, message: "Something went wrong." };
  }
}
