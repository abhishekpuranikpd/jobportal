import { NextResponse } from "next/server";
import { encrypt } from "@/lib/jobseekerauth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const resp = await fetch(
      `http://localhost:3000/api/employer/auth/?apikey=479693736527271&email=${email}&password=${password}`
    );

    if (!resp.ok) {
      const errorData = await resp.json(); // Capture the error response
      throw new Error(errorData.msg || "Failed to login an account");
    }

    const data = await resp.json();

    // Validate the structure of `data` before accessing properties
    if (!data || !data.id || !data.email) {
      throw new Error("Invalid response structure");
    }

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    // Create the session
    const session = await encrypt({ ...payload });

    // Prepare the response and set the cookie with the session
    const response = NextResponse.json({ msg: "Login Successfully!!" });
    response.cookies.set("session", session, { httpOnly: true, path: "/" });

    return response;

  } catch (error) {
    console.error("Login error:", error);

    // Handle errors based on the structure of `error`
    const errorMsg = error.message || "Internal Server Error";

    return new NextResponse(JSON.stringify({ msg: errorMsg }), { status: 500 });
  }
}
