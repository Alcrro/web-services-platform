import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;
    return NextResponse.json("merge, ", name);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json("Internal error");
  }
}
