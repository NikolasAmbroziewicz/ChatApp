const EXPIRE_TIME = 20 * 1000

export const generateExpireTime  = () => {
  return new Date().setTime(new Date().getTime() + EXPIRE_TIME)
}

