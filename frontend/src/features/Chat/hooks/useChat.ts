'use Client'
import { useState } from "react"

import { 
  useChatApi
} from '@/features/Chat/useChatApi'

import { ChatSchema } from '@/features/Chat/validators'

export const useChat = () => {
  const [allChats, setAllChats] = useState<ChatSchema[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

  const {
    getAllChatsApi,
    createChatApi,
    deleteChatApi,
    updateChatApi
  } = useChatApi()
  
  const getAllChats = async () => {
    const res: ChatSchema[] = await getAllChatsApi()
    setAllChats(res)
  }
  
  return {
    loading,
    setLoading,
    allChats,
    getAllChats
  }
}