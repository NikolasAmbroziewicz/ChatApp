import config from 'config'

import { signJwt } from '../../utils/jwt.utils'

export const createTokens = (user: any, session:any, expired = false) => {
  const accessToken = signJwt(
    {...user,session: session.id},
    {expiresIn: expired ? config.get('expiredAccessTokenTimeToLive') : config.get('accessTokenTimeToLive')}
  )

  const refreshToken = signJwt(
    {...user,session: session.id},
    {expiresIn: config.get('refreshTokenTimeToLive')}
  )

  return {
    accessToken, 
    refreshToken
  }
}