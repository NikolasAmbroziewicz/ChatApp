import mongoose from "mongoose";
import { UserDocument } from "../user/models/user.model";

export interface ChatInput {
  name: string,
  user: UserDocument['_id']
}

export interface ChatDocument extends ChatInput {
  createdAt: Date,
  updateAt: Date
}

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true
  }
)

const ChatModel = mongoose.model<ChatDocument>('Chat', chatSchema)

export default ChatModel;