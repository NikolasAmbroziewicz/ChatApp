'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import io, { Socket } from 'socket.io-client'

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const params = useParams()
  const { data: session } = useSession()

  // This Memo is Needed because when tab is switched useSession is refreched and it trigged useEffect
  const tokens = useMemo(() => {
    return ({
      access: session?.tokens.accessToken,
      refresh: session?.tokens.refreshToken
    })
  }, [session?.tokens.accessToken, session?.tokens.refreshToken])

  useEffect(() => {
    console.log('status', params.id)
    if (session?.tokens) {
      const socketIo = io(String(process.env.NEXT_PUBLIC_BACKEND), {
        reconnection: true,
        upgrade: true,
        transports: ["websocket", "polling"],
        auth: {
          Authorization: `Bearer ${session?.tokens.accessToken}`,
          xRefresh: session?.tokens.refreshToken,
        },
        query: {
          roomId: params.id
        }
      });
  
      setSocket(socketIo);
  
      return function () {
        socketIo.disconnect();
      };
    }
  }, [tokens]);

  return socket;
}