'use client'

import Link from 'next/link';

import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react';

import { Button, Loader } from '@mantine/core'
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";

import { useChatContext } from '@/context/ChatContext';

const  SideBar = () => {
  const params = useParams()

  const { allChats, deleteChat, handleEditedChat, loading, toggleModalVisibility } = useChatContext()
  const { data: session } = useSession()

  const activeStyles = (id: string | undefined) => {
    if (params.id === id) {
      return 'bg-blue-200 border-blue-200 border-[1px] text-slate-700'
    } else {
      return 'bg-blue-50 border-blue-50 border-[1px] text-slate-500'
    }
  }

  const chatCreator = (id: string | undefined) => {
    return session?.user._id === id
  }

  return (
    <div className="bg-[#15aabf] h-[100vh]">
      <h1 className='text-center text-slate-700 py-3 text-2xl'>Chat App</h1>
      <div className='flex flex-col items-center'>
        {
          loading ? (
            <div>
              <Loader color='white' size="30" />
            </div>
          ) : (
            allChats.length === 0 ? (
              <span>There is no Chats</span>
            ) : (
              <>
                <span>
                  Avalaible Chats
                </span>
                {
                  allChats.map((chat) => (
                    <Link
                      className={`
                        inline-block  w-4/5 my-2  text-center p-2 rounded cursor-pointer 
                        ${activeStyles(chat._id)} 
                        hover:bg-blue-100 hover:border-blue-100
                      `}
                      href={`/chats/${chat._id}`}
                      key={chat._id}
                    >
                      <div className='flex items-center justify-between'>
                        <span>{chat.title}</span>
                        {
                          chatCreator(chat?.user) && (
                            <div className='flex gap-2'>
                              <AiFillEdit onClick={() => handleEditedChat(chat)} />
                              <AiOutlineClose onClick={() => deleteChat(chat._id)} />
                            </div>
                          )
                        }
                      </div>
                    </Link>
                  ))
                }
                <Button 
                  onClick={toggleModalVisibility}
                  color='#bfdbfe'
                  w={'60%'}
                >
                  Create New Chat
                </Button>
              </>
            )
          )
        }
      </div>
    </div>
  )
}

export default SideBar;