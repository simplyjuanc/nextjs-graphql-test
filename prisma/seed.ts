import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();


const statusData: Prisma.StatusCreateInput[] = [
  {
    value: "TO_DO",
    text: "To Do",
  },
  {
    value: "IN_PROGRESS",
    text: "In Progress",
  },
  {
    value: "DONE",
    text: "Done",
  },
];


const today = new Date();
const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000)

const taskData: Prisma.TaskCreateInput[] = [
  {
    title: "Create",
    description: "Create a new task",
    createdAt: today,
    status: { connect: { value: 'TO_DO' } },
  },
  {
    title: "List",
    description: "Display tasks in a list",
    createdAt: today,
    status: { connect: { value: 'TO_DO' } },
    dueDate: tomorrow
  },
  {
    title: "Delete",
    description: "Delete a task",
    createdAt: today,
    status: { connect: { value: 'TO_DO' } },
    dueDate: tomorrow
  },
  {
    title: "Sub-task 1",
    createdAt: today,
    status: { connect: { value: 'TO_DO' } },
  },
  {
    title: "Sub-task 2",
    createdAt: today,
    status: { connect: { value: 'TO_DO' } },
  },
  {
    title: "Sub-task 3",
    createdAt: today,
    status: { connect: { value: 'TO_DO' } },
  },
  {
    title: "Support sub-tasks",
    description: "Add support for array of sub-tasks on a task",
    createdAt: today,
    status: { connect: { value: 'TO_DO' } },
    dueDate: tomorrow,
    childrenTasks: { connect: [{ id: 4 }, { id: 5 }, { id: 6 }] },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const s of statusData) {
    const status = await prisma.status.create({
      data: s,
    });
    console.log(`Created status with id: ${status.id}`);
  }
  for (const t of taskData) {
    const task = await prisma.task.create({
      data: t,
    });
    console.log(`Created task with id: ${task.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
