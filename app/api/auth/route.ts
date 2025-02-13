import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    (await cookies()).set("ebuddy_recruitment", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to set cookie" },
      { status: 500 }
    );
  }
}
