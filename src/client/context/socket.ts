import { createContext } from 'react';
import { io, type Socket } from 'socket.io-client';

export const socketContext = createContext<
    Socket<SocketEvents.Server2Client, SocketEvents.Client2Server>
>(io(import.meta.env.VITE_SERVER_URL));
