import { gql } from "@apollo/client"

export const CREATE_TASK = gql`
  mutation createTask($title: String!, $description: String, $status: Int!) {
    createTask(title: $title, description: $description, status: $status) {
      id
      description
      createdAt
      title
      status {
        id
        text
        value
      }
    }
  }`


export const CREATE_SUB_TASK = gql`
  mutation createSubTask($title: String!, $description: String, $status: Int!, $parentTaskId: Int!) {
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
  mutation updateTask($id: Int!, $title: String, $description: String, $status: Int) {
    updateTask(id: $id, title: $title, description: $description, status: $status) {
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
  }`

export const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }`

