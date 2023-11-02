import { omit, get } from 'lodash';
import config from 'config'

import UserModel, { UserDocument, UserInput } from './models/user.model';
import SessionModel, { SessionDocument } from "./models/session.model";
import { FilterQuery, UpdateQuery } from 'mongoose';
import { verifyJwt, signJwt } from '../../utils/jwt.utils';

export async function createUser(input: UserInput) {
  try {
    return await UserModel.create(input)
  } catch(e: any) {
    throw new Error(e);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean()
}

export async function createUserSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent })

  return session.toJSON()
}

export async function findUserSession(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean()
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update)
}

export async function reIssueAccessToken(refreshToken: string) {
  const { decoded } = verifyJwt(refreshToken)

  if (!decoded || !get(decoded, '_id')) {
    return false
  }

  const session =  await SessionModel.findById(get(decoded, 'session'))

  if(!session || !session.valid) {
    return false
  }

  const user = await findUser({ _id: session.user })

  if(!user) {
    return false
  }

  const accessToken = signJwt(
    {
      ...user, 
      session: session._id
    },
    {
      expiresIn: config.get('accessTokenTimeToLive')
    }
  )

  return accessToken
}

export async function validatePassword({ 
  email, 
  password
}: {
  email: string, 
  password: string
}) {
  const user = await UserModel.findOne({ email })

  if (!user ) {
    return false
  }

  const isValid = await user.comparePassword(password)

  if(!isValid) {
    return false
  }

  return omit(user.toJSON(), "password")
}