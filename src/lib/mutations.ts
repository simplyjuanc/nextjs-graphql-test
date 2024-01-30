import { gql } from "@apollo/client"
import { NexusGenArgTypes, NexusGenObjects } from "../graphql-server/generated/types"
import { useCustomMutation } from "./utils"



const CREATE_TASK = gql`
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

const UPDATE_TASK = gql`
  mutation UpdateTask($id: Int!, $title: String, $description: String, $status: Int) {
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

const DELETE_TASK = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }`



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
