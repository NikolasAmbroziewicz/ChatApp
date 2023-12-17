'use client'

import { createContext, useContext, useState, useEffect } from "react";

import { useSession } from 'next-auth/react';

import { 
  useChatApi
} from '@/features/Chat/useChatApi'

import { ChatSchema } from '@/features/Chat/validators'

interface IContext {
  allChats: ChatSchema[],
  loading: boolean,
  modalVisibility: boolean,
  createChat: (value: string) => void,
  deleteChat: (value: string | undefined) => void,
  updateChat: (id: number, value: string) => void,
  toggleModalVisibility: () => void
}

const ChatContext = createContext<IContext>({
  allChats: [],
  loading: false,
  modalVisibility: false,
  createChat: () => false,
  deleteChat: () => false,
  updateChat: () => false,
  toggleModalVisibility: () => false
})

export function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const [allChats, setAllChats] = useState<ChatSchema[]>([])
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  const {
    getAllChatsApi,
    createChatApi,
    deleteChatApi,
    updateChatApi
  } = useChatApi()

  const { data } = useSession()

  useEffect(() => {
    if (data?.tokens) {
      getAllChats()
    }
  }, [data])

  const getAllChats = async () => {
    const res: ChatSchema[] = await getAllChatsApi()
    setAllChats(res)

    setLoading(false)
  }

  const createChat = async (title: string) => {
    const res: ChatSchema = await createChatApi({
      title: title
    })
    setAllChats((prevChats) => [...prevChats, res])
  }

  const updateChat = async (id: number, title: string) => {
    const res: ChatSchema = await updateChatApi(id, {
      title: title
    })
  }

  const deleteChat = async (id: string | undefined) => {
    if (id === undefined) return 
    
    const res: ChatSchema = await deleteChatApi(id)
    
    setAllChats((prevChats) => prevChats.filter((chat) => chat._id !== res._id))
  }

  const toggleModalVisibility = () => {
    setModalVisibility(!modalVisibility)
  }

  return (
    <ChatContext.Provider
      value={{
        allChats,
        loading,
        modalVisibility,
        createChat,
        deleteChat,
        updateChat,
        toggleModalVisibility,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => useContext(ChatContext);           