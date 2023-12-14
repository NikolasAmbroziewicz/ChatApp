import {object, string, TypeOf, date} from 'zod'

export const chatSchema = object({
  _id: string().optional(),
  name: string().min(1, 'Title is required')
})

export type ChatSchema = TypeOf<typeof chatSchema>