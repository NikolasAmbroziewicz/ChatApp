import { TypeOf, object, string } from 'zod';

const payload = {
  body: object({
    title: string ({
      required_error: 'Title of the chat is required',
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

export const deleteChatSchema = object({
  ...params
})

export type CreateChatInput = TypeOf<typeof createChatSchema>
export type UpdateChatInput = TypeOf<typeof updateChatSchema>
export type DeleteChatInput = TypeOf<typeof deleteChatSchema>