import { extendType, intArg, nonNull, stringArg } from "nexus";
import { Context } from "../context";




export const createTask = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTask", {
      type: "Task",
      args: {
        title: nonNull(stringArg()),
        description: stringArg({ default: "" }),
        status: nonNull(intArg({ default: 0 })),
      },
      resolve: (_, args, ctx: Context) => {
        return ctx.prisma.task.create({
          data: {
            title: args.title,
            description: args.description,
            status: { connect: { id: args.status } },
          },
          include: { status: true },
        });
      },
    });
  },
});


export const updateTask = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        description: stringArg(),
        status: intArg(),
      },
      resolve: (_, { id, status, ...args }, ctx: Context) => {
        return ctx.prisma.task.update({
          where: { id: id },
          data: {
            ...args,
            status: Number.isInteger(status) ? { connect: { id: status } } : undefined
          },
          include: { status: true },
        });
      },
    });
  },
});


export const deleteTask = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_, args, ctx: Context) => {
        return ctx.prisma.task.delete({
          where: { id: args.id },
          include: { status: true },
        });
      },
    });
  },
});


export const connectSubTask = extendType({
  type: "Mutation",
  definition(t) {
    t.field("connectSubTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
        subTaskId: nonNull(intArg()),
      },
      resolve: (_, args, ctx: Context) => {
        return ctx.prisma.task.update({
          where: { id: args.id },
          data: {
            childTasks: { connect: { id: args.subTaskId } }
          },
          include: { status: true },
        })
      }
    })
  }
});