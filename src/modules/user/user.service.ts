import { omit } from 'lodash';

import UserModel, { UserInput } from './models/user.model';
import SessionModel from "./models/session.model";

export async function createUser(input: UserInput) {
  try {
    return await UserModel.create(input)
  } catch(e: any) {
    throw new Error(e);
  }
}

export async function createUserSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent })

  return session.toJSON()
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