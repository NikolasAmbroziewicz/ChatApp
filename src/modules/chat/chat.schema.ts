import { TypeOf, object, string } from 'zod';

export const createChatSchema = object({
  body: object({
    name: string ({
      required_error: 'Name of the chat is required',
    }),
  })
})

export type CreateChatInput = TypeOf<typeof createChatSchema>