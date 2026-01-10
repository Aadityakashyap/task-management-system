import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";
import { hashPassword, issueTokensForUser } from "@/lib/auth";

export const POST = async (req: NextRequest) => {
  try {
    const json = await req.json();
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success)
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    const { email, password, fullName } = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, passwordHash, fullName },
    });

    await issueTokensForUser(user.id);

    return NextResponse.json(
      { user: { id: user.id, email: user.email, fullName: user.fullName } },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
