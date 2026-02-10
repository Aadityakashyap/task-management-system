import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { setAuthCookies } from "../utils/auth";

export const register = async (req: Request, res: Response) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: parsed?.error?.issues[0]?.message || "Invalid input" });
    }

    const { user, tokens } = await authService.register(parsed.data);

    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    return res.status(201).json(user);
  } catch (error: any) {
    if (error.code === "EMAIL_EXISTS") {
      return res.status(409).json({ error: "Email already registered." });
    }

    return res.status(500).json({ error: "Server error." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: parsed?.error?.issues[0]?.message || "Invalid input" });
    }

    const { user, tokens } = await authService.login(parsed.data);

    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(200).json(user);
  } catch (err: any) {
    if (err.code === "INVALID_CREDENTIALS") {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    return res.status(500).json({ error: "Server error" });
  }
};

export const refresh = async (_req: Request, res: Response) => {
  try {
    const tokens = await authService.refresh(res);
    res.status(200).json(tokens);
  } catch {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  authService.logout(res);
  res.status(200).json({ ok: true });
};
