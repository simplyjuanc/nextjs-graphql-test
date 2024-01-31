import { NexusGenObjects } from "../graphql-server/generated/types";

export function filterTasksByStatus(
  tasks: NexusGenObjects['Task'][],
  status: NexusGenObjects['Status']
) {
  return tasks.filter((task) => task.status.value === status.value);
}


