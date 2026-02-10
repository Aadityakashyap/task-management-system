import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

const ACCESS_SECRET: Secret = env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET: Secret = env.JWT_REFRESH_SECRET!;

export const signAccessToken = (userId: string) =>
  jwt.sign({ sub: userId, type: "access" }, ACCESS_SECRET, {
    expiresIn: "15m",
  });

export const signRefreshToken = (userId: string) =>
  jwt.sign({ sub: userId, type: "refresh" }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, ACCESS_SECRET) as {
    sub: string;
    type: "access";
    iat: number;
    exp: number;
  };

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, REFRESH_SECRET) as {
    sub: string;
    type: "refresh";
    iat: number;
    exp: number;
  };

export const decodeToken = (token: string) =>
  jwt.decode(token) as { exp: number };
