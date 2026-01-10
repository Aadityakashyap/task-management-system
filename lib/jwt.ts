import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES || "7d";

export const signAccessToken = (userId: string) =>
  jwt.sign({ sub: userId, type: "access" }, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES,
  });

export const signRefreshToken = (userId: string) =>
  jwt.sign({ sub: userId, type: "refresh" }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES,
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
