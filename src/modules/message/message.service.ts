import MessageModel, { MessageInput } from "./message.model"

export async function createMessage(input: MessageInput) {
  try {
    return await MessageModel.create(input)
  } catch (e: any) {
    throw new Error(e)
  }
}

export async function findMessages(input: string) {
  try {
    return await MessageModel.find({
      chat: {
        _id: input
      }
    }).populate({ path: 'user' }).limit(10)
  } catch(e: any) {
    throw new Error(e)
  }
}