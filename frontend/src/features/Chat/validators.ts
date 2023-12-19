import {object, string, TypeOf, date} from 'zod'

export const chatSchema = object({
  _id: string().optional(),
  user: string().optional(),
  title: string().min(1, 'Title is required')
})

export const manageChatSchema = object({
  title: string().min(1, 'Title is required')
})

export const messageSchema = object({
  content: string().min(1, 'Content is required')
})

export type ChatSchema = TypeOf<typeof chatSchema>
export type ManageChatSchema = TypeOf<typeof manageChatSchema>
export type MessageSchema = TypeOf<typeof messageSchema>