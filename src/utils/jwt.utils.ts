import * as jwt from 'jsonwebtoken'
import { JwtPayload } from "jsonwebtoken";
import config from 'config';

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
    _id: string
  }
}


const PRIVATE_KEY = config.get<string>('privateKey');
const PUBLIC_KEY = config.get<string>('publicKey');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, PRIVATE_KEY, {
    ...(options && options),
    algorithm: "RS256"
  })
}

export function verifyJwt(token: string) {
  try {
    const decoded = <jwt.UserIDJwtPayload>jwt.verify(token, PUBLIC_KEY) 

    return  {
      valid: true,
      expired: false,
      decoded
    }
  } catch(e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null
    }
  }
}