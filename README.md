## Getting Started

Simple Task Management Application that allows users to create, update delete, and view tasks.

It is a NextJS app with the following integrations:

- Prisma ORM with SQLite
- Nexus (GraphQL schema generation)
- Apollo Server
- Apollo Client
- GraphQL Code Generator (for apollo client requests)

### NPM

Kick off with an npm install

```
npm i
```

### Prisma

Migrate and seed your db

```
npx prisma migrate dev --name init
```

### Generate types

Generate your API and front-end types (remember to re-run these if you make any changes to your schema)

```
npm run generate
npm run codegen
```

### Run

Run the NextJS dev server

```
npm run dev
```

Which can be viewed here: http://localhost:3000

The GraphQL api can be viewed here: http://localhost:3000/api/graphql

### Instructions

Some guide tasks are provided in `prisma/seed.ts`

Complete as many as you want (or add more) in as much detail as you like.

There may be some bugs and you are also free to change any configuration if you want to.
