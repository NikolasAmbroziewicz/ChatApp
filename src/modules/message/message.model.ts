import mongoose from "mongoose";
import { UserDocument } from "../user/models/user.model";
import { ChatDocument } from "../chat/chat.model";

export interface MessageInput {
  name: string,
  user: UserDocument['_id']
}

export interface MessageDocument extends MessageInput {
  createdAt: Date,
  updateAt: Date
}

const messageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User"
    },
    content: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const MessageModel = mongoose.model<MessageDocument>('Message', messageSchema)

export default MessageModel;