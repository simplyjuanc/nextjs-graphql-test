import { gql } from "@apollo/client"
import { NexusGenArgTypes } from "../graphql-server/generated/types"
import { useCustomMutation } from "./utils"



const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String, $status: Int!) {
    createTask(title: $title, description: $description, status: $status) {
      id
      description
      createdAt
      title
      status {
        id
      }
    }
  }`

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

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
      title
      description
      createdAt
    }
  }`



export const useCreateTask = () => useCustomMutation<NexusGenArgTypes['Mutation']['createTask']>(CREATE_TASK);
export const useUpdateTask = () => useCustomMutation<NexusGenArgTypes['Mutation']['updateTask']>(UPDATE_TASK);
export const useDeleteTask = () => useCustomMutation<NexusGenArgTypes['Mutation']['deleteTask']>(DELETE_TASK);
