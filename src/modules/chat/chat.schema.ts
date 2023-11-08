import { TypeOf, object, string } from 'zod';

const payload = {
  body: object({
    name: string ({
      required_error: 'Name of the chat is required',
    }),
  })
}

const params = {
  params: object({
    chatId: string({
      required_error: "productId is required",
    }),
  }),
};

export const createChatSchema = object({
  ...payload
})

export const updateChatSchema = object({
  ...payload,
  ...params
})

export type CreateChatInput = TypeOf<typeof createChatSchema>
export type UpdateChatInput = TypeOf<typeof updateChatSchema>