import { extendType, intArg, list, nonNull, stringArg } from "nexus";

export const createStatus = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createStatus", {
      type: "Status",
      args: {
        name: nonNull(stringArg()),
        text: stringArg(),
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.status.create({
          data: {
            value: args.name,
            text: args.name,
          },
        });
      },
    });
  }
});


export const deleteStatus = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteStatus", {
      type: "Status",
      args: {
        id: nonNull(intArg()),
      },
      resolve: (_parent, args, ctx) => {
        return ctx.prisma.status.delete({
          where: { id: args.id },
        });
      },
    });
  }
});


export const updateStatus = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateStatus", {
      type: "Status",
      args: {
        id: nonNull(intArg()),
        value: stringArg(),
        text: stringArg(),
      },
      resolve: (_parent, { id, ...args }, ctx) => {
        return ctx.prisma.status.update({
          where: { id },
          data: { ...args },
        });
      },
    });
  }
});