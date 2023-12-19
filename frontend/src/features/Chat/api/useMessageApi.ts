'use client'
import { GenericAbortSignal } from "axios"
import { useSession } from "next-auth/react"

import { MessageSchema } from '@/features/Chat/validators'

import ApiBase from "@/shared/api/ApiBase"

export const useMessageApi = () => {
  const { data } = useSession()

  const getMessagesApi = async (chatId: string | string[]) => {
    return ApiBase().get(`/v1/api/message/${chatId}`, {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }

  const deleteMessageApi = async (messageId: string) => {
    return ApiBase().delete(`/v1/api/message/${messageId}`, {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }

  const editMessageApi = async (messageId: string, content: MessageSchema) => {
    return ApiBase().put(`/v1/api/message/${messageId}`, {
      content: content
    }, {
      headers: {
        Authorization: `Bearer ${data?.tokens.accessToken}`,
        'x-refresh': data?.tokens.refreshToken
      }
    }).then((res) => res.data)
  }

  return {
    deleteMessageApi,
    editMessageApi,
    getMessagesApi
  }
}