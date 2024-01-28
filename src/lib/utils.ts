import { DocumentNode, useMutation } from "@apollo/client";
import { NexusGenObjects } from "../graphql-server/generated/types";

export function filterTasksByStatus(
  tasks: NexusGenObjects['Task'][],
  status: NexusGenObjects['Status']
) {
  return tasks.filter((task) => task.status.value === status.value);
}


export function useCustomMutation<T, V extends string, U>(mutationType: DocumentNode) {
  const [mutate, { data, loading, error }] = useMutation<Record<V, U>>(mutationType);

  const taskAction = async (args: T) => {
    try {
      const res = await mutate({
        variables: { ...args },
      });
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  return { taskAction, payload: { data, loading, error } };
}
