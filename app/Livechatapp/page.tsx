"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Terminal, Send, User, Users, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SocketProvider, useSocket } from "@/components/socket-provider"

// Wrapper component that provides the Socket context
export default function LiveChatPage() {
  return (
    <SocketProvider>
      <LiveChat />
    </SocketProvider>
  )
}

// Main chat component that uses the Socket context
function LiveChat() {
  const { socket, isConnected } = useSocket()
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ user: string; text: string; timestamp: number }[]>([])
  const [activeUsers, setActiveUsers] = useState<string[]>([])
  const [isJoined, setIsJoined] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Handle joining the chat
  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && socket) {
      socket.emit("userJoin", username)
      setIsJoined(true)
    }
  }

  // Handle leaving the chat
  const handleLeave = () => {
    if (socket && isJoined) {
      socket.emit("userLeave", username)
      setIsJoined(false)
    }
  }

  // Handle sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && socket && isJoined) {
      socket.emit("message", { user: username, text: message })
      setMessage("")
    }
  }

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return

    // Listen for new messages
    const messageListener = (message: { user: string; text: string; timestamp: number }) => {
      setMessages((prev) => [...prev, message])
    }

    // Listen for previous messages when joining
    const previousMessagesListener = (previousMessages: { user: string; text: string; timestamp: number }[]) => {
      setMessages(previousMessages)
    }

    // Listen for active users updates
    const activeUsersListener = (users: string[]) => {
      setActiveUsers(users)
    }

    socket.on("message", messageListener)
    socket.on("previousMessages", previousMessagesListener)
    socket.on("activeUsers", activeUsersListener)

    // Clean up listeners on unmount
    return () => {
      socket.off("message", messageListener)
      socket.off("previousMessages", previousMessagesListener)
      socket.off("activeUsers", activeUsersListener)

      // Leave the chat when component unmounts if joined
      if (isJoined) {
        socket.emit("userLeave", username)
      }
    }
  }, [socket, username, isJoined])

  // Format timestamp
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-green-500/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-green-500" />
            <span className="font-mono text-xl font-bold">
              AceCommander<span className="text-green-500">09</span>
            </span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Live<span className="text-green-500">Chat</span>
          </h1>
          <p className="text-gray-400">Chat in real-time with other visitors</p>
        </div>

        {!isJoined ? (
          <Card className="max-w-md mx-auto bg-zinc-900/50 border border-green-500/20 p-6">
            <h2 className="text-xl font-bold mb-4">Join the Chat</h2>
            <form onSubmit={handleJoin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border border-green-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  placeholder="Enter a username"
                  maxLength={20}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={!isConnected || !username.trim()}
                className="w-full bg-green-500 hover:bg-green-600 text-black"
              >
                Join Chat
              </Button>
              {!isConnected && <p className="text-yellow-500 text-sm text-center">Connecting to chat server...</p>}
            </form>
          </Card>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 h-[calc(100vh-250px)]">
            {/* Users sidebar */}
            <Card className="md:w-64 bg-zinc-900/50 border border-green-500/20 p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-green-500" />
                <h2 className="font-bold">Online Users ({activeUsers.length})</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {activeUsers.map((user, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className={user === username ? "font-bold" : ""}>
                        {user} {user === username && "(you)"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={handleLeave}
                variant="outline"
                className="mt-4 border-red-500 text-red-500 hover:bg-red-500/10 w-full"
              >
                <LogOut className="h-4 w-4 mr-2" /> Leave Chat
              </Button>
            </Card>

            {/* Chat area */}
            <Card className="flex-1 bg-zinc-900/50 border border-green-500/20 flex flex-col overflow-hidden">
              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.user === username ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.user === "system"
                            ? "bg-gray-800/50 text-gray-400 text-center mx-auto italic text-sm"
                            : msg.user === username
                              ? "bg-green-500/20 text-white"
                              : "bg-zinc-800 border border-green-500/10"
                        }`}
                      >
                        {msg.user !== "system" && (
                          <div className="flex items-center gap-2 mb-1">
                            {msg.user === username ? (
                              <>
                                <span className="font-semibold">{msg.user}</span>
                                <User className="h-3 w-3" />
                              </>
                            ) : (
                              <>
                                <User className="h-3 w-3 text-green-500" />
                                <span className="font-semibold">{msg.user}</span>
                              </>
                            )}
                            <span className="text-xs text-gray-400 ml-auto">{formatTime(msg.timestamp)}</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="border-t border-green-500/20 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-black/50 border border-green-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  />
                  <Button
                    type="submit"
                    disabled={!message.trim()}
                    className="bg-green-500 hover:bg-green-600 text-black"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 bg-black border-t border-green-500/20">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AceCommander09. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

