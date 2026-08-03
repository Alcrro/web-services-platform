import { AuthRepositoryImpl } from "@/modules/auth/infrastructure/auth.repository";
import { ClientLinkingToTheUser } from "@/modules/clients/application/use-case/LinkedToTheUser.usecase";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ClientRepositoryImpl } from "@/modules/clients/infrastructure/client.repository";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { getSession } from "@/shared/utils/getSession";
import { PublishNotificationUseCase } from "@/modules/notifications/application/usecase/PublisNotification.usecase";
import { DBUiNotificationPublisher } from "@/modules/notifications/infrastructure/persistence/DBUiNotificationPublisher";
import { EmailNotificationSenderImpl } from "@/modules/notifications/infrastructure/persistence/DBEmailNotificationSender";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const { value } = body;

    const cookieToken = await getSession();
    const authHeader = req.headers.get("authorization");

    const token = cookieToken || authHeader?.replace("Bearer ", "");

    if (!token)
      return NextResponse.json({ error: "No token" }, { status: 401 });

    const authRepoImpl = new AuthRepositoryImpl(prisma);
    const clientRepoImpl = new ClientRepositoryImpl(prisma);
    const jwtTokenService = new JWTTokenServices();
    const { userId } = jwtTokenService.decodeToken(token);
    const linkUserWithClient = new ClientLinkingToTheUser(
      authRepoImpl,
      clientRepoImpl
    );

    const linked = await linkUserWithClient.execute(userId, value);
    const publisher = new PublishNotificationUseCase(
      new DBUiNotificationPublisher(prisma),
      new EmailNotificationSenderImpl()
    );
    if (!linked)
      return NextResponse.json(
        { error: "client doesnt exist!" },
        { status: 401 }
      );
    const clientId = linked.client.id;
    const userEmail = linked.userEmail;
    await publisher.execute({
      id: crypto.randomUUID(),
      type: "ORDER_ACCOUNT_LINKED",
      title: "Client Linked",
      message: `User ${userId} linked to client ${clientId}`,
      payload: {
        userId,
        clientId, // adevăratul ID numeric sau string al clientului
      },
      createdAt: new Date(),
      read: false,
      recipientEmail: userEmail,
    });

    return NextResponse.json(linked);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json("internal error");
  }
}
