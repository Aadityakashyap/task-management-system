import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { signAccessToken, signRefreshToken, verifyAccessToken } from "./jwt";
import crypto from "crypto";

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);
export const comparePassword = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const setAuthCookies = async (
  accessToken: string,
  refreshToken: string
) => {
  const cookieStore = await cookies();
  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });
  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
};

export const getUserFromAccessToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;
  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    return user ?? null;
  } catch {
    return null;
  }
};

export const issueTokensForUser = async (userId: string) => {
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);

  const decoded = JSON.parse(
    Buffer.from(refreshToken.split(".")[1], "base64").toString()
  );
  const expiresAt = new Date(decoded.exp * 1000);

  await prisma.refreshToken.create({
    data: { userId, tokenHash: hashToken(refreshToken), expiresAt },
  });

  await setAuthCookies(accessToken, refreshToken);
  return { accessToken, refreshToken };
};
