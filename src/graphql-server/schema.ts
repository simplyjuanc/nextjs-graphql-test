import { makeSchema, asNexusMethod } from "nexus";
import { DateTimeResolver } from "graphql-scalars";
import path from "path";
import * as TypeDefs from './typeDefs';
import * as Queries from './queries';
import * as Mutations from './mutations';


export const DateTime = asNexusMethod(DateTimeResolver, "date");

export const schema = makeSchema({
  types: [
    DateTime,
    TypeDefs,
    Queries,
    Mutations
  ],
  outputs: {
    schema: path.join(process.cwd(), "src", "graphql-server", "generated", "schema.graphql"),
    typegen: path.join(process.cwd(), "src", "graphql-server", "generated", "types.ts"),
  },
  contextType: {
    module: path.join(process.cwd(), "src", "graphql-server", "context.ts"),
    export: "Context",
  },
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
});
