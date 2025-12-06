"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Monitor, Home, ExternalLink, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function EmulatorPage() {
  const [url, setUrl] = useState("")
  const [currentUrl, setCurrentUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      setError("Please enter a valid URL")
      return
    }

    setError("")
    setLoading(true)

    // Add https:// if no protocol is specified
    let processedUrl = url.trim()
    if (!processedUrl.match(/^https?:\/\//i)) {
      processedUrl = "https://" + processedUrl
    }

    try {
      // Validate URL
      new URL(processedUrl)
      setCurrentUrl(processedUrl)
      
      // Simulate loading
      setTimeout(() => {
        setLoading(false)
      }, 500)
    } catch (err) {
      setError("Invalid URL format")
      setLoading(false)
    }
  }

  const openInNewTab = () => {
    if (currentUrl) {
      window.open(currentUrl, "_blank")
    }
  }

  const clearViewer = () => {
    setCurrentUrl("")
    setUrl("")
    setError("")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Monitor className="h-6 w-6 text-green-500" />
            <span className="font-mono text-xl font-bold">
              Web<span className="text-green-500">Emulator</span>
            </span>
          </motion.div>
          <Link href="/">
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Website <span className="text-green-500">Emulator</span>
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Enter any URL to view the website in an embedded viewer
          </p>
        </motion.div>

        {/* URL Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-zinc-900/50 border border-green-500/20 mb-6">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter URL (e.g., example.com or https://example.com)"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 bg-black border-green-500/20 text-white placeholder:text-gray-500 focus:border-green-500"
                  />
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-black"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading
                      </>
                    ) : (
                      "Load"
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                {currentUrl && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Monitor className="h-4 w-4" />
                      Currently viewing: <span className="text-green-500">{currentUrl}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-green-500 text-green-500 hover:bg-green-500/10"
                        onClick={openInNewTab}
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Open in New Tab
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-500 hover:bg-red-500/10"
                        onClick={clearViewer}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Iframe Viewer */}
        {currentUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-zinc-900/50 border border-green-500/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative" style={{ height: "calc(100vh - 350px)", minHeight: "500px" }}>
                  <iframe
                    src={currentUrl}
                    className="w-full h-full border-0"
                    title="Website Emulator"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Information Card */}
        {!currentUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-zinc-900/50 border border-green-500/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-green-500">How to Use</h2>
                <div className="space-y-4 text-gray-400">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      1
                    </div>
                    <p>Enter any website URL in the input field above (e.g., google.com, github.com, etc.)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      2
                    </div>
                    <p>Click the "Load" button or press Enter to load the website</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      3
                    </div>
                    <p>The website will be displayed below in an embedded viewer</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-black rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 mt-1">
                      4
                    </div>
                    <p>You can interact with the website directly in the viewer</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-500/90">
                      <strong>Note:</strong> Some websites may not load due to security restrictions (X-Frame-Options). 
                      In such cases, use the "Open in New Tab" button to view the site directly.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}
