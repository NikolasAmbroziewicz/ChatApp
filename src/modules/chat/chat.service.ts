import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import ChatModel, { ChatDocument } from './chat.model'

import { ChatInput } from './chat.model';

export async function createChat(input: ChatInput) {
  try {
    return await ChatModel.create(input)
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findChat(
  query: FilterQuery<ChatDocument>, 
  options: QueryOptions = { lean: true}
) {
  return ChatModel.findOne(query, {}, options)
}

export async function findChats() {
  return ChatModel.find().limit(10).lean()
}

export async function findAndUpdateChat(
  query: FilterQuery<ChatDocument>,
  update: UpdateQuery<ChatDocument>,
  options: QueryOptions
) {
  return ChatModel.findOneAndUpdate(query, update, options)
}