import { Request, Response } from 'express'
import config from 'config'
import { omit } from 'lodash'

import { signJwt } from '../../utils/jwt.utils'
import logger from '../../utils/logger'
import { createUser, validatePassword, createUserSession } from './user.service'
import { CreateUserInput } from './schema/user.schema'

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
  try {
    const user = await createUser(req.body)
    return res.send(omit(user.toJSON(), "password"))
  } catch (e: any) {
    logger.error(e,)
    return res.status(409).send(e.message)
  }
}

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate user password
  const user = await validatePassword(req.body)

  if(!user) {
    return res.sendStatus(401).send("Invalid Email or Password")
  }

  //create a session
  const session = await createUserSession(user._id, req.get("user-agent") || "")

  //create an accesstoken
  const accessToken = signJwt(
    {
      ...user, 
      session: session._id
    },
    {
      expiresIn: config.get('accessTokenTimeToLive')
    }
  )

  //create a refreshtoken
  const refreshToken = signJwt(
    {
      ...user, 
      session: session._id
    },
    {
      expiresIn: config.get('refreshTokenTimeToLive')
    }
  )

  //return access & refresh token
  return res.send({
    accessToken,
    refreshToken
  })
}