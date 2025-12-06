"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const snakeRef = useRef<{ x: number; y: number }[]>([{ x: 10, y: 10 }])
  const foodRef = useRef({ x: 15, y: 15 })
  const directionRef = useRef({ x: 1, y: 0 })
  const nextDirectionRef = useRef({ x: 1, y: 0 })

  const GRID_SIZE = 20
  const CELL_SIZE = 20

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return

      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current.y === 0) {
            nextDirectionRef.current = { x: 0, y: -1 }
          }
          break
        case "ArrowDown":
          if (directionRef.current.y === 0) {
            nextDirectionRef.current = { x: 0, y: 1 }
          }
          break
        case "ArrowLeft":
          if (directionRef.current.x === 0) {
            nextDirectionRef.current = { x: -1, y: 0 }
          }
          break
        case "ArrowRight":
          if (directionRef.current.x === 0) {
            nextDirectionRef.current = { x: 1, y: 0 }
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameStarted, gameOver])

  const spawnFood = () => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    foodRef.current = newFood
  }

  const startGame = () => {
    snakeRef.current = [{ x: 10, y: 10 }]
    directionRef.current = { x: 1, y: 0 }
    nextDirectionRef.current = { x: 1, y: 0 }
    setScore(0)
    setGameOver(false)
    setGameStarted(true)
    spawnFood()
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#1a1a1a"
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }

    // Draw snake
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#22c55e" : "#15803d"
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2)
    })

    // Draw food
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(foodRef.current.x * CELL_SIZE, foodRef.current.y * CELL_SIZE, CELL_SIZE - 2, CELL_SIZE - 2)
  }

  useEffect(() => {
    if (!gameStarted || gameOver) {
      draw()
      return
    }

    gameLoopRef.current = setInterval(() => {
      // Update direction
      directionRef.current = nextDirectionRef.current

      // Move snake
      const head = snakeRef.current[0]
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y,
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true)
        setGameStarted(false)
        return
      }

      // Check self collision
      if (snakeRef.current.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true)
        setGameStarted(false)
        return
      }

      // Add new head
      snakeRef.current.unshift(newHead)

      // Check food collision
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        setScore((s) => s + 10)
        spawnFood()
      } else {
        // Remove tail
        snakeRef.current.pop()
      }

      draw()
    }, 150)

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameStarted, gameOver])

  // Initial draw
  useEffect(() => {
    draw()
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between items-center w-full max-w-md">
        <div className="text-xl font-bold">Score: <span className="text-green-500">{score}</span></div>
        <Button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-black"
        >
          {gameStarted ? "Restart" : "Start Game"}
        </Button>
      </div>

      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="border border-green-500/20 rounded"
      />

      {gameOver && (
        <div className="text-center">
          <p className="text-red-500 text-xl font-bold mb-2">Game Over!</p>
          <p className="text-gray-400">Final Score: {score}</p>
        </div>
      )}

      {!gameStarted && !gameOver && (
        <div className="text-center text-gray-400">
          <p>Use arrow keys to control the snake</p>
          <p>Eat the red food to grow!</p>
        </div>
      )}
    </div>
  )
}
