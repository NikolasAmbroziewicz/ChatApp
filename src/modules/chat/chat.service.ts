import ChatModel from './chat.model'

import { ChatInput } from './chat.model';

export async function createChat(input: ChatInput) {
  try {
    return await ChatModel.create(input)
  } catch (e: any) {
    throw new Error(e);
  }
}