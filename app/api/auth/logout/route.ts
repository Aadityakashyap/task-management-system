import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyRefreshToken } from "@/lib/jwt";
import { hashToken, clearAuthCookies } from "@/lib/auth";

export const POST = async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (refreshToken) {
      const payload = verifyRefreshToken(refreshToken);
      const tokenHash = hashToken(refreshToken);
      const record = await prisma.refreshToken.findFirst({
        where: { userId: payload.sub, tokenHash, revoked: false },
      });
      if (record) {
        await prisma.refreshToken.update({
          where: { id: record.id },
          data: { revoked: true },
        });
      }
    }
    await clearAuthCookies();
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    await clearAuthCookies();
    return NextResponse.json({ ok: true }, { status: 200 });
  }
};
