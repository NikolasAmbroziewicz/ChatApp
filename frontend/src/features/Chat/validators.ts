import {object, string, TypeOf} from 'zod'

const createChatSchema = object({
  name: string().min(1, 'Title is required')
})

export type CreateChatSchema = TypeOf<typeof createChatSchema>