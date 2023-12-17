import MessageModel, { MessageInput } from "./message.model"

export async function createMessage(input: MessageInput) {
  try {
    return await MessageModel.create(input)
  } catch (e: any) {
    throw new Error(e)
  }
}