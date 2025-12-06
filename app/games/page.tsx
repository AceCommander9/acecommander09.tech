"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gamepad2, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import SnakeGame from "@/components/games/SnakeGame"
import PongGame from "@/components/games/PongGame"
import TicTacToe from "@/components/games/TicTacToe"
import CubeGame from "@/components/games/CubeGame"

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)

  const games = [
    {
      id: "snake",
      name: "Snake",
      description: "Classic snake game - eat food and grow!",
      type: "2D",
      component: SnakeGame,
    },
    {
      id: "pong",
      name: "Pong",
      description: "Retro pong game - keep the ball in play!",
      type: "2D",
      component: PongGame,
    },
    {
      id: "tictactoe",
      name: "Tic Tac Toe",
      description: "Classic X and O game - get three in a row!",
      type: "2D",
      component: TicTacToe,
    },
    {
      id: "cube",
      name: "3D Cube",
      description: "Interactive 3D cube - drag to rotate!",
      type: "3D",
      component: CubeGame,
    },
  ]

  const selectedGameData = games.find((g) => g.id === selectedGame)

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
            <Gamepad2 className="h-6 w-6 text-green-500" />
            <span className="font-mono text-xl font-bold">
              Games<span className="text-green-500">Hub</span>
            </span>
          </motion.div>
          <Link href="/">
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 container mx-auto">
        {!selectedGame ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Game <span className="text-green-500">Collection</span>
              </h1>
              <p className="text-gray-400 text-lg">
                Choose a game and start playing!
              </p>
            </motion.div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Card
                    className="bg-zinc-900/50 border border-green-500/20 overflow-hidden hover:border-green-500/40 transition-all cursor-pointer h-full"
                    onClick={() => setSelectedGame(game.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <Gamepad2 className="h-8 w-8 text-green-500" />
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                          {game.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                      <Button
                        className="w-full bg-green-500 hover:bg-green-600 text-black"
                        onClick={() => setSelectedGame(game.id)}
                      >
                        Play Now
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Game View */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500/10"
                  onClick={() => setSelectedGame(null)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Games
                </Button>
                <h2 className="text-2xl font-bold">
                  {selectedGameData?.name}
                </h2>
              </div>

              <div className="bg-zinc-900/50 border border-green-500/20 rounded-lg p-6">
                {selectedGameData && <selectedGameData.component />}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}
