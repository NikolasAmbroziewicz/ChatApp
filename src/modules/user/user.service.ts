import { Document } from 'mongoose';
import UserModel, { UserDocument, UserInput } from './user.model';

export async function createUser(input: UserInput) {
  try {
    return await UserModel.create(input)
  } catch(e: any) {
    throw new Error(e);
  }
}