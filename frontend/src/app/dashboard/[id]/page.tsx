'use client'
import { useEffect, useState, useRef, FormEvent } from 'react'

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
      setMessages((prevMessages) => [...prevMessages, message])

      scrollToBottom()
    }

    // Check if User is in the Chat if this user is in the chat then does not send message again.
    if(session?.user) {
      console.log('join-room', session.user)
      socket?.emit('join-room', {
        room: params.id,
        user: session?.user._id
      })  
    }

    socket?.on("connection", onConnection);
    socket?.on('message', onMessage)

    return () => {
      socket?.off('connection', onConnection)
      socket?.off('message', onMessage)
    }
  }, [socket, session?.user]);

  return (
    <div className='flex justify-between flex-col gap-3 h-full max-h-[100vh] p-2'>
      <div ref={chatContainer}  className='overflow-y-scroll'>
        {
          messages.map((element, index) => (
            <Message
              key={index}
              author={element.user}
              date={element.date}
              description={element?.message}
              isAuthor={false}
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
          color='rgb(191 219 254)'
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  )
}

export default ChatPage