import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/shared/utils/getSession";
import { JWTTokenServices } from "@/services/token/JWTToken";

const updateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  avatar: z.string().max(200_000).nullable().optional(),
});

export async function PATCH(req: NextRequest) {
  const token = await getSession();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId } = new JWTTokenServices().decodeToken(token);

  const body = await req.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { name, avatar } = parsed.data;

  const updated = await prisma.user.update({
    where: { id: Number(userId) },
    data: {
      ...(name !== undefined && { name }),
      ...(avatar !== undefined && { avatar }),
    },
    select: { id: true, name: true, email: true, avatar: true },
  });

  return NextResponse.json(updated);
}
