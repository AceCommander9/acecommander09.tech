import type { Server as NetServer } from "http"
import type { NextApiRequest } from "next"
import { Server as ServerIO } from "socket.io"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(req: NextApiRequest) {
  const res = new Response(null)

  if (!(global as any).io) {
    console.log("New Socket.io server...")
    // adapt Next's net server to socket.io
    const httpServer: NetServer = (res as any).socket?.server

    const io = new ServerIO(httpServer, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    })

    // Store messages in memory (in a real app, you'd use a database)
    const messages: { user: string; text: string; timestamp: number }[] = []
    const ACTIVE_USERS = new Set<string>()

    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id)

      // Send existing messages to new users
      socket.emit("previousMessages", messages)

      // Handle user joining
      socket.on("userJoin", (username) => {
        ACTIVE_USERS.add(username)
        const joinMessage = {
          user: "system",
          text: `${username} has joined the chat`,
          timestamp: Date.now(),
        }
        messages.push(joinMessage)
        io.emit("message", joinMessage)
        io.emit("activeUsers", Array.from(ACTIVE_USERS))
      })

      // Handle new messages
      socket.on("message", ({ user, text }) => {
        const message = { user, text, timestamp: Date.now() }
        messages.push(message)
        // Keep only the last 100 messages
        if (messages.length > 100) {
          messages.shift()
        }
        io.emit("message", message)
      })

      // Handle user leaving
      socket.on("userLeave", (username) => {
        ACTIVE_USERS.delete(username)
        const leaveMessage = {
          user: "system",
          text: `${username} has left the chat`,
          timestamp: Date.now(),
        }
        messages.push(leaveMessage)
        io.emit("message", leaveMessage)
        io.emit("activeUsers", Array.from(ACTIVE_USERS))
      })

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id)
      })
    })

    // Store the socket.io server in the global object
    ;(global as any).io = io
  }

  return res
}

