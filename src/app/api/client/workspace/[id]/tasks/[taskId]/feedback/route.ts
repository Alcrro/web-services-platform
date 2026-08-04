import { JWTTokenServices } from "@/services/token/JWTToken";
import { getSession } from "@/shared/utils/getSession";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FindById } from "@/modules/users/application/FindById.usecase";
import { UserRepositoryImpl } from "@/modules/users/infrastructure/user.repository";
import { z } from "zod/v4";

const feedbackSchema = z.object({
  message: z.string().min(1).max(1000),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; taskId: string }> }
) {
  try {
    const { id: orderId, taskId } = await params;

    const cookieToken = await getSession();
    let token = cookieToken;
    const reqHeader = req.headers.get("Authorization");
    if (!token) token = reqHeader?.replace("Bearer ", "") ?? null;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const jwtTokenService = new JWTTokenServices();
    const { userId } = jwtTokenService.decodeToken(token);

    const userRepo = new UserRepositoryImpl(prisma);
    const user = await new FindById(userRepo).execute(userId);
    if (!user.clientId) return NextResponse.json({ error: "Not a client" }, { status: 403 });

    const body = await req.json();
    const parsed = feedbackSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.issues }, { status: 400 });
    }

    // ownership: verifica ca task-ul apartine unui order al clientului
    const order = await prisma.serviceOrder.findFirst({
      where: { id: orderId, clientId: user.clientId, isDeleted: false },
      select: { id: true },
    });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const task = await prisma.task.findFirst({
      where: { id: taskId, orderId },
      select: { id: true },
    });
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    const comment = await prisma.taskComment.create({
      data: {
        taskId,
        authorId: user.clientId,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({ data: comment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
