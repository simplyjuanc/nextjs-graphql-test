import { gql, useMutation } from "@apollo/client"
import { NexusGenArgTypes } from "../graphql-server/generated/types"



const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $title: String, $description: String, $status: Int) {
    updateTask(id: $id, title: $title, description: $description, status: $status) {
      title
      status {
        value
        text
        id
      }
      description
      createdAt
    }
  }`


export function useUpdateTask() {
  const [putTask, { data, loading, error }] = useMutation<NexusGenArgTypes['Mutation']['updateTask']>(UPDATE_TASK);

  const updateTask = async (args: NexusGenArgTypes['Mutation']['updateTask']) => {
    try {
      const res = await putTask({
        variables: { ...args },
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  return { updateTask, payload: { data, loading, error } }
};
