import { Request, Response } from 'express'
import config from 'config'
import { omit } from 'lodash'

import { signJwt } from '../../utils/jwt.utils'
import logger from '../../utils/logger'
import { createUser, validatePassword, createUserSession, findUserSession, updateSession } from './user.service'
import { CreateUserInput } from './schema/user.schema'

export async function createUserHandler(req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
  try {
    const user = await createUser(req.body)
    return res.send(omit(user.toJSON(), "password"))
  } catch (e: any) {
    logger.error(e)
    return res.status(409).send(e.message)
  }
}

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate user password
  const user = await validatePassword(req.body)

  if(!user) {
    return res.status(401).send({
      message: "Invalid Email or Password"
    })
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

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id

  const sessions = await findUserSession({
    user: userId,
    valid: true
  })

  return res.send(sessions)
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session

  await updateSession({
    _id: sessionId,
  }, {
    valid: false
  })

  return res.send({
    accessToken: null,
    refreshToken: null
  })
}