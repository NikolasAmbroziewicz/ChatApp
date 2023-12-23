'use client'
import { useRef } from 'react'

import { useSession } from 'next-auth/react'

import { Textarea, Button, Loader } from '@mantine/core'

import Message from '@/features/Chat/components/Message'
import { useMessages } from '@/features/Chat/hooks/useMessages'

const ChatPage = () => {
  const chatContainer = useRef<HTMLDivElement | null>(null)
  const { data: session } = useSession()

  const {
    allMessages,
    isLoading,
    messageInput,
    setMessageInput,
    handleAddMessage,
    handleDeleteMessage,
    handleUpdateMessage,
  } = useMessages({
    chatContainer: chatContainer
  })

  return (
    <div className='flex justify-between flex-col gap-3 h-full max-h-[100vh] p-2 overflow-hidden'>
      {
        isLoading ? (
          <div className='flex justify-center h-full items-center'>
            <Loader color='#15aabf' size="30" />
          </div>
        ) : (
          <>
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
          </>
        )
      }
    </div>
  )
}

export default ChatPage