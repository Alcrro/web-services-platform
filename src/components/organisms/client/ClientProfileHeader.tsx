import { getSession } from "@/shared/utils/getSession";
import { JWTTokenServices } from "@/services/token/JWTToken";
import { prisma } from "@/lib/prisma";
import ClientAccountButton from "@/components/molecules/client/ClientAccountButton";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const ClientProfileHeader = async () => {
  const token = await getSession();
  if (!token) return null;

  const { userId } = new JWTTokenServices().decodeToken(token);
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: { name: true, email: true, avatar: true, clientId: true },
  });
  if (!user) return null;

  const client = user.clientId
    ? await prisma.client.findUnique({
        where: { id: user.clientId },
        select: { phone: true },
      })
    : null;

  const initials = getInitials(user.name);

  return (
    <div className="px-4 pt-5 pb-4 border-b border-(--color-border) flex flex-col items-center gap-3 max-lg:hidden">
      {/* Avatar */}
      <div className="relative group">
        <div className="w-14 h-14 rounded-full bg-(--color-accent) flex items-center justify-center overflow-hidden ring-2 ring-(--color-accent)/20 shadow-md">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-white tracking-wide select-none">
              {initials}
            </span>
          )}
        </div>
      </div>

      {/* Name + email */}
      <div className="text-center min-w-0 w-full">
        <p className="text-sm font-semibold text-(--color-text) leading-tight truncate">
          {user.name}
        </p>
        <p className="text-[11px] text-(--color-text-secondary) mt-0.5 truncate">
          {user.email}
        </p>
      </div>

      {/* Account button */}
      <ClientAccountButton
        name={user.name}
        email={user.email}
        phone={client?.phone ?? null}
        avatar={user.avatar ?? null}
      />
    </div>
  );
};

export default ClientProfileHeader;
