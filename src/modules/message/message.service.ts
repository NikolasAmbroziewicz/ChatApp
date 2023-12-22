import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import MessageModel, { MessageInput, MessageDocument } from "./message.model"

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
    })
      .populate({ path: 'user' })
      .sort({$natural: -1 })
      .limit(10)
      .then((res) => res.reverse())
  } catch(e: any) {
    throw new Error(e)
  }
}

export async function updateMessage(
  query: FilterQuery<MessageDocument>,
  update: UpdateQuery<MessageDocument>,
  options: QueryOptions
) {
  try {
    return MessageModel.findOneAndUpdate(query, update, {new: true}).populate({ path: 'user' })
  } catch(e: any) {
    throw new Error(e)
  }
}