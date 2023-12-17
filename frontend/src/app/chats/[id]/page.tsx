'use client'
import { useEffect, useState, useRef, FormEvent, useMemo } from 'react'

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { useSocket } from '@/shared/hooks/useSocket'

import { Textarea, Button } from '@mantine/core'
import Message from '@/features/Chat/components/Message'

import { MessageType } from '@/features/Chat/types'

const ChatPage = () => {
  const chatContainer = useRef<HTMLDivElement | null>(null)
  const [messages, setMessages] = useState<MessageType[]>([])
  const [messageInput, setMessageInput] = useState<string>('')

  const params = useParams()
  const socket = useSocket()
  const { data: session } = useSession()

  const scrollToBottom = () => {
    if(chatContainer.current) {
      chatContainer.current.scrollTop =
      chatContainer.current.scrollHeight + 1000;
    }
  }

  const handleSendMessage = async(event: FormEvent) => {
    event.preventDefault()

    socket?.emit('chat-message', {
      room: params.id,
      user: session?.user._id,
      message: messageInput
    })

    setMessageInput('')
    scrollToBottom()
  }

  useEffect(() => {
    const onConnection = () => {
      console.log("connected to socket");
    }

    const onMessage = (message: MessageType) => {
      console.log('onMessafe', message)
      setMessages((prevMessages) => [...prevMessages, message])

      scrollToBottom()
    }
    
    const onPreviousMessages = (messages: MessageType[]) => {
      setMessages(messages)
    }

    // Listeners
    socket?.on("connection", onConnection);
    socket?.on('message', onMessage)
    socket?.on('previous-messages', onPreviousMessages)

    // Emiters
    socket?.emit('join-room')  

    return () => {
      socket?.off('connection', onConnection)
      socket?.off('message', onMessage)
    }
  }, [socket]);

  return (
    <div className='flex justify-between flex-col gap-3 h-full max-h-[100vh] p-2 overflow-hidden'>
      <div ref={chatContainer}  className='flex flex-col overflow-y-scroll h-[100%]'>
        {
          messages.map((element, index) => (
            <Message
              key={index}
              author={element.user.name}
              date={element.date}
              message={element?.message}
              type={element.type}
              isAuthor={element.user._id === session?.user._id}
            />
          ))
        }
      </div>
      <form onSubmit={(val) => handleSendMessage(val)} className='flex flex-col'>
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