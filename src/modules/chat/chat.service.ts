import ChatModel from './chat.model'
import { CreateChatInput } from './chat.schema'

export async function createChat(input: CreateChatInput['body']) {
  try {
    return await ChatModel.create(input)
  } catch (e: any) {
    throw new Error(e);
  }
}