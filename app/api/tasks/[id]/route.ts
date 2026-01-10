import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromAccessToken } from "@/lib/auth";
import { taskUpdateSchema } from "@/lib/validators";
import { Params } from "@/lib/types";

export const GET = async (_req: NextRequest, { params }: Params) => {
  const user = await getUserFromAccessToken();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const task = await prisma.task.findFirst({
    where: { id: params.id, userId: user.id },
  });
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ task }, { status: 200 });
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  const user = await getUserFromAccessToken();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json();
  const parsed = taskUpdateSchema.safeParse(json);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const existing = await prisma.task.findFirst({
    where: { id: params.id, userId: user.id },
  });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.task.update({
    where: { id: params.id },
    data: {
      ...parsed.data,
      ...(parsed.data.dueDate
        ? { dueDate: new Date(parsed.data.dueDate) }
        : {}),
    },
  });
  return NextResponse.json({ task: updated }, { status: 200 });
};

export const DELETE = async (_req: NextRequest, { params }: Params) => {
  const user = await getUserFromAccessToken();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.task.findFirst({
    where: { id: params.id, userId: user.id },
  });
  if (!existing)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.task.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true }, { status: 200 });
};
