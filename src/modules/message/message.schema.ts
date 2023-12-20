import { TypeOf, object, string } from 'zod'

export const deleteMessageParams = object({
  params: object({
    messageId: string({
      required_error: "productId is required",
    }),
  })
})

export const updateMessagePayload = object({
  params: object({
    messageId: string({
      required_error: "productId is required",
    }),
  }),
  body: object({
    content: string({
      required_error: "productId is required",
    })
  })
})

export type DeleteMessageInput = TypeOf<typeof deleteMessageParams>
export type UpdateMessageInput = TypeOf<typeof updateMessagePayload>