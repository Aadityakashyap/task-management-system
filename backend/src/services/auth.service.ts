import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { env } from "../config/env";
import { Response } from "express";
import {
  comparePassword,
  hashPassword,
  issueTokensForUser,
} from "../utils/auth";

export const authService = {
  async register(data: { email: string; password: string; fullName: string }) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existing) {
      throw { code: "EMAIL_EXISTS" };
    }

    const passwordHash = await hashPassword(data.password);
    const user = await prisma.user.create({
      data: { email: data.email, fullName: data.fullName, passwordHash },
    });

    const tokens = await issueTokensForUser(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      tokens,
    };
  },

  async login(data: any) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) throw { code: "INVALID_CREDENTIALS" };

    const valid = await comparePassword(data.password, user.passwordHash);
    if (!valid) throw { code: "INVALID_CREDENTIALS" };

    const tokens = await issueTokensForUser(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      tokens,
    };
  },

  refresh(res: Response) {
    const accessToken = jwt.sign({ sub: "userId" }, env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    res.cookie("access_token", accessToken, { httpOnly: true });
    return { ok: true };
  },

  logout(res: Response) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  },
};
