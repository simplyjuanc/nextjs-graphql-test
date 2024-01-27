
import { extendType, intArg, nonNull, objectType } from "nexus";
import { Context } from "./context";


export const getTasks = extendType({
  type: "Query",
  definition(t) {
    t.list.field("Task", {
      type: "Task",
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.task.findMany({
          include: { status: true },
        });
      },
    });
  }
});

export const getTaskById = extendType({
  type: "Query",
  definition(t) {
    t.field("getTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx: Context) => {
        return ctx.prisma.task.findUnique({
          where: { id: args.id },
          include: { status: true },
        });
      },
    });
  }
});


export const getTaskByStatus = extendType({
  type: "Query",
  definition(t) {
    t.list.field("getTaskByStatus", {
      type: "Task",
      args: {
        status: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx: Context) => {
        return ctx.prisma.task.findMany({
          where: { statusId: args.status },
          include: { status: true },
        });
      },
    });
  }
});