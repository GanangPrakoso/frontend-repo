import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  (await cookies()).delete("ebuddy_recruitment");
  return NextResponse.json({ success: true });
}
