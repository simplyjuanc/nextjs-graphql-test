import { DocumentNode, useMutation } from "@apollo/client";
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK, CREATE_SUB_TASK } from "../lib/mutations";
import { CreateSubTaskMutation, CreateSubTaskMutationVariables, CreateTaskMutation, CreateTaskMutationVariables, DeleteTaskMutation, DeleteTaskMutationVariables, Task, UpdateTaskMutation, UpdateTaskMutationVariables } from "../gql/graphql";


export interface QData<T> {
  data: T;
}


function useCustomMutation<T, U>(mutation: DocumentNode) {
  const [mutate, { data, loading, error }] = useMutation<U>(mutation);

  const taskAction = async (args: T) => {
    try {
      const res = await mutate({
        variables: { ...args },
        onError: (err) => {
          throw new Error(err.message);
        }
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
  CreateTaskMutationVariables,
  CreateTaskMutation
>(CREATE_TASK);

export const useCreateSubTask = () => useCustomMutation<
  CreateSubTaskMutationVariables,
  CreateSubTaskMutation>(CREATE_SUB_TASK);


export const useUpdateTask = () => useCustomMutation<
  UpdateTaskMutationVariables,
  UpdateTaskMutation
>(UPDATE_TASK);

export const useDeleteTask = () => useCustomMutation<
  DeleteTaskMutationVariables,
  DeleteTaskMutation
>(DELETE_TASK);
