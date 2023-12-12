'use client'

import Link from 'next/link';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react'

import { useChat } from "@/features/Chat/hooks/useChat";

const  SideBar = () => {
  const { 
    allChats,
    getAllChats,
    loading,
    setLoading
  } = useChat()
  const  { data } =useSession()

  useEffect(() => {
    if (data?.tokens) {
      getAllChats()
    }

  }, [data])

  return (
    <div className="bg-blue-200 h-[100vh]">
      <h1 className='text-center text-slate-700 py-3 text-2xl'>Chat App</h1>
      <div className='flex flex-col items-center'>
        {
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
                    className='inline-block bg-blue-50 w-4/5 my-2 text-slate-700 text-center p-2 rounded cursor-pointer' 
                    href={`/dashboard/${chat._id}`}
                    key={chat._id}
                  >
                    <span>{chat.name}</span>
                  </Link>
                ))
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default SideBar;