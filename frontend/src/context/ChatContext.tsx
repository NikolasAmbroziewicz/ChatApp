'use client'

import { createContext, useContext, useState, useEffect } from "react";

import { useSession } from 'next-auth/react';

import { 
  useChatApi
} from '@/features/Chat/useChatApi'

import { ChatSchema } from '@/features/Chat/validators'

interface IContext {
  allChats: ChatSchema[],
  editedChatValue: ChatSchema | null,
  loading: boolean,
  modalVisibility: boolean,
  createChat: (value: string) => void,
  deleteChat: (value: string | undefined) => void,
  handleEditedChat: (value: ChatSchema) => void,
  updateChat: (id: string, value: string) => void,
  toggleModalVisibility: () => void
}

const ChatContext = createContext<IContext>({
  allChats: [],
  editedChatValue: null,
  loading: false,
  modalVisibility: false,
  createChat: () => false,
  deleteChat: () => false,
  handleEditedChat: () => false,
  updateChat: () => false,
  toggleModalVisibility: () => false
})

export function ChatContextProvider({ children }: { children: React.ReactNode }) {
  const [allChats, setAllChats] = useState<ChatSchema[]>([])
  const [editedChatValue, setEditedChatValue] = useState<ChatSchema | null>(null)
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

  const toggleModalVisibility = () => {
    setModalVisibility(!modalVisibility)
    setEditedChatValue(null)
  }

  const handleEditedChat = (val: ChatSchema) => {
    setEditedChatValue(val)
    setModalVisibility(!modalVisibility)
  }

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

  const updateChat = async (id: string, title: string) => {
    const res: ChatSchema = await updateChatApi(id, {
      title: title
    })

    const idx = allChats.findIndex(chat => chat._id === res._id)
    const newChats = [...allChats]
    newChats[idx] = res

    setAllChats(newChats)
  }

  const deleteChat = async (id: string | undefined) => {
    if (id === undefined) return 
    
    const res: ChatSchema = await deleteChatApi(id)
    
    setAllChats((prevChats) => prevChats.filter((chat) => chat._id !== res._id))
  }

  return (
    <ChatContext.Provider
      value={{
        allChats,
        editedChatValue,
        loading,
        modalVisibility,
        createChat,
        deleteChat,
        handleEditedChat,
        updateChat,
        toggleModalVisibility,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => useContext(ChatContext);           