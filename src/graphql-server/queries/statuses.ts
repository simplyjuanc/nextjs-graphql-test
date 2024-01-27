import { extendType } from "nexus";

export const getStatuses = extendType({
  type: "Query",
  definition(t) {
    t.list.field("Status", {
      type: "Status",
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.status.findMany();
      },
    });
  }
});