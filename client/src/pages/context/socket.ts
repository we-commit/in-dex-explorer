import React from "react"
import { io } from "socket.io-client"

export const socket = io((process.env.REACT_APP_WS_URL_TROJAN || "http://localhost:3001/") + "explorer")
export const SocketContext = React.createContext(socket)
