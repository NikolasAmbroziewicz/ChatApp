'use client'
import ApiBase from "@/shared/api/ApiBase"

import { useSession } from "next-auth/react"
import { CreateChatSchema } from '@/features/Chat/validators'

export const useChatApi = () => {
  const { data } = useSession()

  const createChat = async (value: CreateChatSchema) => {
    return ApiBase().post('/v1/api/chat', {
      ...value
    }, {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }

  const updateChat = async (id: number, value: CreateChatSchema) => {
    return ApiBase().put(`/v1/api/chat/${id}`, {
      ...value
    }, {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }

  const deleteChat = async (id: number) => {
    return ApiBase().delete(`/v1/api/chat/${id}`, {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }

  const getAllChats = async () => {
    return ApiBase().get('/v1/api/chat', {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }
  return {
    createChat,
    deleteChat,
    getAllChats,
    updateChat
  }
}