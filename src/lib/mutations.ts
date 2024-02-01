import { gql } from "@apollo/client"

export const CREATE_TASK = gql`
  mutation createTask($title: String!,$status: Int!, $description: String,  $dueDate: String) {
    createTask(title: $title, description: $description, status: $status, dueDate: $dueDate) {
      id
      description
      createdAt
      dueDate
      title
      status {
        id
        text
        value
      }
    }
  }`


export const CREATE_SUB_TASK = gql`
  mutation createSubTask($title: String!, $status: Int!, $parentTaskId: Int!, $description: String, ) {
    createSubTask(title: $title, description: $description, status: $status, parentTaskId: $parentTaskId) {
      id
      description
      createdAt
      title
      parentTaskId
      dueDate
      status {
        id
        text
        value
      }
    }
  }`



export const UPDATE_TASK = gql`
  mutation updateTask($id: Int!, $title: String, $description: String, $status: Int, $dueDate: String) {
    updateTask(id: $id, title: $title, description: $description, status: $status, dueDate: $dueDate) {
      id
      title
      description
      createdAt
      dueDate
      listPosition
      status {
        id
        value
        text
      }
    }
  }`

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }`

