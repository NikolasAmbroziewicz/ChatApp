'use client'

import { useState, useEffect, FormEvent, useRef, MutableRefObject } from "react"

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { MessageType } from '@/features/Chat/types'

import { useSocket } from '@/shared/hooks/useSocket'

interface IUseChat { 
  chatContainer?: MutableRefObject<HTMLDivElement | null>
}

export const useMessages = ({ chatContainer }: IUseChat) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [allMessages, setAllMessages] = useState<MessageType[]>([])
  const [messageInput, setMessageInput] = useState<string>('')

  const params = useParams()
  const socket = useSocket()
  const { data: session } = useSession()

  useEffect(() => {
    socket?.on('message', onMessage)
    socket?.on('previous-messages', onPreviousMessages)
    socket?.on('delete-message', onDeleteMessage)
    socket?.on('update-message', onMessageUpdate)

    // Emiters
    socket?.emit('join-room') 

    return () => {
      socket?.off('message', onMessage)
      socket?.off('previous-messages', onPreviousMessages)
      socket?.off('delete-message', onDeleteMessage)
      socket?.off('update-message', onMessageUpdate)
    }
  }, [socket]);

  const onPreviousMessages = (allMessagesRes: MessageType[]) => {
    setAllMessages(allMessagesRes)
    setIsLoading(false)
  }

  const onDeleteMessage = (deletedMessage: MessageType) => {
    setAllMessages((messages) => {
      const newMessages = [...messages]
      const idx = messages.findIndex((message) => message._id === deletedMessage._id)
      newMessages[idx] = deletedMessage
      return newMessages
    })
  }

  const onMessageUpdate = (updatedMessage: MessageType) => {
    setAllMessages((messages) => {
      const newMessages = [...messages]
      const idx = messages.findIndex((message) => message._id === updatedMessage._id)
      newMessages[idx] = updatedMessage
      return newMessages
    })
  }

  const onMessage = (message: MessageType) => {
    setAllMessages((prevMessages) => [...prevMessages, message])

    scrollToBottom()
  }

  const handleAddMessage = async(event: FormEvent) => {
    event.preventDefault()

    if(messageInput !== '') {
      socket?.emit('chat-message', {
        room: params.id,
        user: session?.user._id,
        message: messageInput
      })
  
      setMessageInput('')
      scrollToBottom()
    }
  }

  const handleUpdateMessage = (content: string, messageId: string) => {
    socket?.emit('update-message', {
      messageId: messageId,
      content: content
    })
  }

  const handleDeleteMessage = async (messageId: string | undefined) => {
    socket?.emit('delete-message', {
      messageId: messageId
    })
  }

  const scrollToBottom = () => {
    if(chatContainer?.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight + 10000;
    }
  }
  

  return {
    allMessages,
    isLoading,
    messageInput,
    setMessageInput,
    handleAddMessage,
    handleDeleteMessage,
    handleUpdateMessage,
  }
}