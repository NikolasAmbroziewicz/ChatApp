'use client'
import { useEffect, useState, useRef, FormEvent, useMemo } from 'react'

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Textarea, Button } from '@mantine/core'

import Message from '@/features/Chat/components/Message'

import { useSocket } from '@/shared/hooks/useSocket'
import { MessageType } from '@/features/Chat/types'

const ChatPage = () => {
  const chatContainer = useRef<HTMLDivElement | null>(null)
  const [allMessages, setAllMessages] = useState<MessageType[]>([])
  const [messageInput, setMessageInput] = useState<string>('')

  const params = useParams()
  const socket = useSocket()
  const { data: session } = useSession()

  const onDeleteMessage = (deletedMessage: MessageType) => {
    setAllMessages((messages) => {
      const newMessages = [...messages]
      const idx = messages.findIndex((message) => message._id === deletedMessage._id)
      newMessages[idx] = deletedMessage
      return newMessages
    })
  }

  useEffect(() => {
    const onMessage = (message: MessageType) => {
      setAllMessages((prevMessages) => [...prevMessages, message])
      scrollToBottom()
    }
    
    const onPreviousMessages = (allMessagesRes: MessageType[]) => {
      setAllMessages(allMessagesRes)
    }

    const onMessageUpdate = () => {
      console.log('message Update')
    }

    // Listeners
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

  const scrollToBottom = () => {
    if(chatContainer.current) {
      chatContainer.current.scrollTop =
      chatContainer.current.scrollHeight + 1000;
    }
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

  const handleUpdateMessage = () => {}

  const handleDeleteMessage = async (messageId: string | undefined) => {
    socket?.emit('delete-message', {
      messageId: messageId
    })
  }

  return (
    <div className='flex justify-between flex-col gap-3 h-full max-h-[100vh] p-2 overflow-hidden'>
      <div ref={chatContainer}  className='flex flex-col overflow-y-scroll h-[100%]'>
        {
          allMessages.map((element, index) => (
            <Message
              key={index}
              element={element}
              isAuthor={element.user._id === session?.user._id}
              handleDeleteMessage={handleDeleteMessage}
              handleUpdateMessage={handleUpdateMessage}
            />
          ))
        }
      </div>
      <form onSubmit={(val) => handleAddMessage(val)} className='flex flex-col'>
        <Textarea
          className='pb-2'
          placeholder='Message'
          value={messageInput}
          onChange={(val) => setMessageInput(val.target.value)}
        />
        <Button
          color='cyan'
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  )
}

export default ChatPage