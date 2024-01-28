import { gql, useQuery } from "@apollo/client";
import { NexusGenFieldTypes } from "../graphql-server/generated/types";


interface QueryData<T> {
  data: T;
}


export const GET_TASKS = gql`
  query Task {
    Task {
      id
      title
      description
      status {
        id
        value
        text      
      }
    }
  }
`;

export const GET_STATUSES = gql`
  query Status {
    Status {
      id
      value
      text
    }
  }
`;



export function useGetTasks() {
  const { data, error, loading } = useQuery<QueryData<NexusGenFieldTypes['Query']['Task']>>(GET_TASKS)
  if (error) return error;
  if (loading) return loading;
  return data;
}