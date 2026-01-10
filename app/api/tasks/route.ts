import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromAccessToken } from "@/lib/auth";
import { taskCreateSchema, taskQuerySchema } from "@/lib/validators";

export const GET = async (req: NextRequest) => {
  const user = await getUserFromAccessToken();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const parsed = taskQuerySchema.safeParse({
    page: searchParams.get("page") ?? undefined,
    q: searchParams.get("q") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
  });
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });

  const page = parseInt(parsed.data.page ?? "1", 10);
  const take = parseInt(parsed.data.limit ?? "10", 10);
  const skip = (page - 1) * take;
  const q = parsed.data.q;
  const status = parsed.data.status;

  const where = {
    userId: user.id,
    ...(q ? { title: { contains: q, not: undefined } } : {}),
    ...(status ? { status } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.task.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
    prisma.task.count({ where }),
  ]);

  return NextResponse.json(
    { items, total, page, pages: Math.ceil(total / take) },
    { status: 200 }
  );
};

export const POST = async (req: NextRequest) => {
  const user = await getUserFromAccessToken();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = taskCreateSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const { title, description, status, dueDate } = parsed.data;
  const task = await prisma.task.create({
    data: {
      userId: user.id,
      title,
      description,
      status,
      ...(dueDate ? { dueDate: new Date(dueDate) } : {}),
    },
  });

  return NextResponse.json({ task }, { status: 201 });
};
