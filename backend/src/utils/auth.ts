import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import crypto from "crypto";
import { decodeToken, signAccessToken, signRefreshToken, verifyAccessToken, verifyRefreshToken } from "./jwt";

export const hashPassword = async (password: string) =>
  bcrypt.hash(password, 10);

export const comparePassword = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const setAuthCookies = async (
  res: Response,
  accessToken: string,
  refreshToken: string,
) => {
  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15 * 1000,
  });
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 * 1000,
  });
};

export const clearAuthCookies = async (res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
};

export const getUserFromAccessToken = async (req: Request) => {
  const token = req.cookies.access_token;
  if (!token) return null;
  try {
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    return user ?? null;
  } catch {
    return null;
  }
};

export const getRefreshToken = async (req: Request) => {
  const token = req.cookies.refresh_token;
  if (!token) return null;
  try {
    const payload = verifyRefreshToken(token);
    return payload ?? null;
  } catch {
    return null;
  }
};

export const issueTokensForUser = async (userId: string) => {
  const accessToken = signAccessToken(userId);
  const refreshToken = signRefreshToken(userId);

  const decoded = decodeToken(refreshToken);
  const expiresAt = new Date(decoded.exp * 1000);

  await prisma.refreshToken.create({
    data: { userId, tokenHash: hashToken(refreshToken), expiresAt },
  });

  return { accessToken, refreshToken };
};
