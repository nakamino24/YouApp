export async function register({ email, password }: { email: string; password: string }) {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Service Register Error:", error);
    return { success: false, message: "Something went wrong." };
  }
}
