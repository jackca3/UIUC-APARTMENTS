import { NextResponse } from "next/server";
import { clearXServerSession, getXServerSession } from "@/lib/server/x-session";

export async function GET() {
  const session = await getXServerSession();
  return NextResponse.json({
    authenticated: Boolean(session),
    email: session?.email ?? null,
  });
}

export async function DELETE() {
  await clearXServerSession();
  return NextResponse.json({ ok: true });
}
