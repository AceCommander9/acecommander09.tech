"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send message to API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      // Add AI response
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-green-500/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold">AceCommander<span className="text-green-500">09</span></span>
          </Link>
          <Link href="/" className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500/10">
            Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Command<span className="text-green-500">Bot</span>
          </h1>
          <p className="text-gray-400">Chat with my AI assistant</p>
        </div>
        
        <div className="flex-1 flex flex-col">
          {/* Chat container */}
          <div className="flex-1 bg-zinc-900/50 border border-green-500/20 rounded-lg flex flex-col overflow-hidden">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <p>Send a message to start chatting</p>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user"
                          ? "bg-green-500/20 text-white"
                          : "bg-zinc-800 border border-green-500/10"
                      }`}
                    >
                      <div className="mb-1 font-semibold">
                        {message.role === "user" ? "You" : "CommandBot"}
                      </div>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 border border-green-500/10 rounded-lg p-4 max-w-[80%]">
                    <div className="mb-1 font-semibold">CommandBot</div>
                    <div className="text-gray-400">Thinking...</div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="border-t border-green-500/20 p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-black/50 border border-green-500/20 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()} 
                  className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-black border-t border-green-500/20">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AceCommander09. Powered by OpenAI.
        </div>
      </footer>
    </div>
  );
}
