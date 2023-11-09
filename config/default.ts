import dotenv from 'dotenv'

dotenv.config()

export default {
  port: 8080,
  socketPort: 80,
  dbUri: process.env.DB_URI,
  saltWorkFactor: 10,
  accessTokenTimeToLive: '15m',
  refreshTokenTimeToLive: '1y',
  privateKey: process.env.PRIVATE_KEY,
  publicKey: process.env.PUBLIC_KEY,
  upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL,
  origin: process.env.ORIGIN
}