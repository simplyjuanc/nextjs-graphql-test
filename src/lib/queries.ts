import { gql } from "@apollo/client";




export const GET_TASKS = gql`
  query Task {
    Task {
      id
      title
      description
      createdAt
      dueDate
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


export const GET_SUB_TASKS = gql`
  query getSubTasks($id: Int!) {
    getSubTasks(id: $id) {
      childrenTasks {
        id
        createdAt
        dueDate
        title
        description
        status {
          id
        }
      }
    }
  }
`;

export interface QData<T> {
  data: T;
}

// export function useGetTasks() {
//   const { data, error, loading } = useQuery<QueryData<NexusGenFieldTypes['Query']['Task']>>(GET_TASKS)
//   if (error) return error;
//   if (loading) return loading;
//   return { data, loading, error };
// }

// export function useGetSubTasks(id: number) {
//   const { data, loading, error } = useQuery<QueryData<NexusGenFieldTypes['Query']['getSubTasks']>>(GET_SUB_TASKS, { variables: { id } });
//   if (error) return error;
//   if (loading) return loading;
//   return { data, loading, error };
// }