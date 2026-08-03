import { prisma } from "@/lib/prisma";
import { clientFactory } from "@/modules/clients/domain/factory/clientFactory";
import { AppError } from "@/shared/utils/AppError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const options = req.nextUrl.searchParams;

    const page = Number(options.get("page") || 1);
    const limit = Number(options.get("limit") || 10);

    const { findAllUseCase } = clientFactory();

    const result = await findAllUseCase.execute({ page, limit });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message });
    }

    return NextResponse.json("internal Error");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const result = await prisma.client.create({
      data: {
        name,
        email,
        phone: phone || null,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
    }

    console.error("GET /clients error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
