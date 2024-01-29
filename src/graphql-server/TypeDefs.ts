import { objectType } from "nexus";
import { Task, Status } from "nexus-prisma";




export const TaskType = objectType({
  name: Task.$name,
  description: Task.$description,
  definition(t) {
    t.nonNull.field(Task.id);
    t.nonNull.field(Task.title);
    t.field(Task.description);
    t.nonNull.field(Task.createdAt);
    t.field(Task.dueDate);
    t.nonNull.field('status', { type: StatusType });
    t.field('parentTask', { type: TaskType });
    t.list.field('childrenTasks', {
      type: TaskType,
      resolve: (parent, _, ctx) => {
        return ctx.prisma.task.findMany({
          where: { parentTaskId: parent.id },
          include: { status: true }
        }).then(res => {
          return res
        });
      }
    })
  }
})

export const StatusType = objectType({
  name: Status.$name,
  description: Status.$description,
  definition(t) {
    t.nonNull.field(Status.id);
    t.nonNull.field(Status.value);
    t.nonNull.field(Status.text);
  },
});