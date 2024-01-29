import { DocumentNode, useMutation, useQuery } from "@apollo/client";
import { NexusGenObjects } from "../graphql-server/generated/types";

export function filterTasksByStatus(
  tasks: NexusGenObjects['Task'][],
  status: NexusGenObjects['Status']
) {
  return tasks.filter((task) => task.status.value === status.value);
}


export function useCustomMutation<T, V extends string, U>(mutation: DocumentNode) {
  const [mutate, { data, loading, error }] = useMutation<Record<V, U>>(mutation);

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


export function useCustomQuery<T>(query: DocumentNode, args?: Record<string, number | string>) {
  const { data, loading, error } = useQuery<T>(query, { variables: args });
  if (error) return error;
  if (loading) return loading;
  return data;
}