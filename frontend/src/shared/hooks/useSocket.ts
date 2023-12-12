'use client'
import { useState, useEffect } from 'react'

import { useSession } from 'next-auth/react'

import io, { Socket } from 'socket.io-client'

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const { data: session } = useSession()

  useEffect(() => {
    if (session?.tokens) {
      const socketIo = io(String(process.env.NEXT_PUBLIC_BACKEND), {
        reconnection: true,
        upgrade: true,
        transports: ["websocket", "polling"],
        auth: {
          Authorization: `Bearer ${session?.tokens.accessToken}`,
          xRefresh: session?.tokens.refreshToken
        }
      });
  
      setSocket(socketIo);
  
      return function () {
        socketIo.disconnect();
      };
    }
  }, [session]);

  return socket;
}