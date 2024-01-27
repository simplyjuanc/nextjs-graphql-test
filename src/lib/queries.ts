import { gql } from "@apollo/client";


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