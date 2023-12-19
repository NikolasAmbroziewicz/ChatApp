'use client'
import ApiBase from "@/shared/api/ApiBase"

import { useSession } from "next-auth/react"
import { ChatSchema } from '@/features/Chat/validators'

export const useChatApi = () => {
  const { data } = useSession()      

  const createChatApi = async (value: ChatSchema) => {
    return ApiBase().post('/v1/api/chat', {
      ...value
    }, {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }

  const updateChatApi = async (id: string, value: ChatSchema) => {
    return ApiBase().put(`/v1/api/chat/${id}`, {
      ...value
    }, {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }

  const deleteChatApi = async (id: string) => {
    return ApiBase().delete(`/v1/api/chat/${id}`, {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken,
      },
    }).then((res) => res.data)
  }

  const getAllChatsApi = async () => {
    return ApiBase().get('/v1/api/chat', {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }
  return {
    createChatApi,
    deleteChatApi,
    getAllChatsApi,
    updateChatApi
  }
}