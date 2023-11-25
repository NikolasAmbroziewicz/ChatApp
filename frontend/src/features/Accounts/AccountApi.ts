import ApiBase from "@/shared/api/ApiBase"

import { SignInType, SignUpType } from '@/features/Accounts/validators'

type Tokens = {
  accessToken: string,
  refreshToken: string
}

export const useAccountApi = () => {
  const signUpUser = async (data: SignUpType) => {
    return ApiBase()
      .post('/v1/api/user', { ...data })
      .then(res => res.data)
  }

  const signInUser = async (data: SignInType) => {
    return ApiBase()
      .post('/v1/api/sessions', { ...data })
      .then(res => res.data)
  }

  const getSession = async (tokens: Tokens) => {
    return ApiBase()
      .get('/v1/api/sessions', {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          'x-refresh-token': tokens.refreshToken
        }
      }).then((res) => res)
  }

  return {
    signInUser,
    signUpUser,
    getSession
  }
}