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
      parentTaskId
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
      id
      createdAt
      dueDate
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

