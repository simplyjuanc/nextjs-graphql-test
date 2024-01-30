import { DocumentNode, useMutation, useQuery } from "@apollo/client";
import { NexusGenArgTypes, NexusGenObjects } from "../graphql-server/generated/types";
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK } from "../lib/mutations";


export interface QData<T> {
  data: T;
}


function useCustomMutation<T, V extends string, U>(mutation: DocumentNode) {
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


export const useCreateTask = () => useCustomMutation<
  NexusGenArgTypes['Mutation']['createTask'],
  'createTask',
  NexusGenObjects['Task']
>(CREATE_TASK);

export const useUpdateTask = () => useCustomMutation<
  NexusGenArgTypes['Mutation']['updateTask'],
  'updateTask',
  NexusGenObjects['Task']
>(UPDATE_TASK);

export const useDeleteTask = () => useCustomMutation<
  NexusGenArgTypes['Mutation']['deleteTask'],
  'deleteTask',
  NexusGenObjects['Task']
>(DELETE_TASK);
