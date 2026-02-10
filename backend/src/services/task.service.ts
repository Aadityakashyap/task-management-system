import { prisma } from "../config/prisma";

export const taskService = {
  async getPaginated(userId: string, query: any) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    const skip = (page - 1) * limit;

    const where = {
      userId,
      ...(query.q && {
        title: { contains: query.q, mode: "insensitive" },
      }),
      ...(query.status && { status: query.status }),
    };

    const [items, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.task.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    };
  },

  create(userId: string, data: any) {
    return prisma.task.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        status: data.status,
        ...(data.dueDate && {
          dueDate: new Date(data.dueDate),
        }),
      },
    });
  },

  getById(userId: string, id: string) {
    return prisma.task.findFirst({
      where: { id, userId },
    });
  },

  async update(userId: string, id: string, data: any) {
    const existing = await prisma.task.findFirst({
      where: { id, userId },
    });
    if (!existing) return null;

    return prisma.task.update({
      where: { id },
      data: {
        ...data,
        ...(data.dueDate && {
          dueDate: new Date(data.dueDate),
        }),
      },
    });
  },

  async remove(userId: string, id: string) {
    const existing = await prisma.task.findFirst({
      where: { id, userId },
    });
    if (!existing) return false;

    await prisma.task.delete({ where: { id } });
    return true;
  },
};
