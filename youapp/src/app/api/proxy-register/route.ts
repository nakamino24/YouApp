export async function POST(req: Request) {
    try {
      const body = await req.json();
      const response = await fetch("http://techtest.youapp.ai/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        },
      });
    } catch (error) {
      console.error("Error in proxy-register:", error);
      return new Response(
        JSON.stringify({ success: false, message: "Internal Server Error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
}
  