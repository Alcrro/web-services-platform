import { prisma } from "@/lib/prisma";
import { BcryptServices } from "@/services/bcrypt/BcryptServices";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const bcryptService = new BcryptServices();
    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashed = await bcryptService.hashedPassword(password);

    await prisma.user.create({
      data: { name: name ?? null, email, password: hashed },
    });

    return NextResponse.json(
      { message: "Sign up successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
