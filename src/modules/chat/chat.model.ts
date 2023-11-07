import mongoose from "mongoose";

export interface ChatDocument {
  name: string,
  createdAt: Date,
  updateAt: Date
}

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const ChatModel = mongoose.model<ChatDocument>('Chat', chatSchema)

export default ChatModel;