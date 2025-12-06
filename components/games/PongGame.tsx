"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState({ player: 0, computer: 0 })
  const [gameStarted, setGameStarted] = useState(false)
  const gameLoopRef = useRef<number | null>(null)

  const gameStateRef = useRef({
    paddleHeight: 80,
    paddleWidth: 10,
    ballSize: 10,
    playerY: 160,
    computerY: 160,
    ballX: 300,
    ballY: 200,
    ballSpeedX: 4,
    ballSpeedY: 4,
    canvasWidth: 600,
    canvasHeight: 400,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameStarted) return
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const mouseY = e.clientY - rect.top
      gameStateRef.current.playerY = Math.max(
        0,
        Math.min(mouseY - gameStateRef.current.paddleHeight / 2, gameStateRef.current.canvasHeight - gameStateRef.current.paddleHeight)
      )
    }

    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove)
      return () => canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [gameStarted])

  const startGame = () => {
    const state = gameStateRef.current
    state.ballX = state.canvasWidth / 2
    state.ballY = state.canvasHeight / 2
    state.ballSpeedX = 4 * (Math.random() > 0.5 ? 1 : -1)
    state.ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1)
    state.playerY = 160
    state.computerY = 160
    setScore({ player: 0, computer: 0 })
    setGameStarted(true)
  }

  const draw = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const state = gameStateRef.current

    // Clear canvas
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, state.canvasWidth, state.canvasHeight)

    // Draw center line
    ctx.strokeStyle = "#22c55e"
    ctx.setLineDash([5, 15])
    ctx.beginPath()
    ctx.moveTo(state.canvasWidth / 2, 0)
    ctx.lineTo(state.canvasWidth / 2, state.canvasHeight)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw paddles
    ctx.fillStyle = "#22c55e"
    ctx.fillRect(10, state.playerY, state.paddleWidth, state.paddleHeight)
    ctx.fillRect(state.canvasWidth - 20, state.computerY, state.paddleWidth, state.paddleHeight)

    // Draw ball
    ctx.fillStyle = "#ef4444"
    ctx.fillRect(state.ballX - state.ballSize / 2, state.ballY - state.ballSize / 2, state.ballSize, state.ballSize)
  }

  const update = () => {
    if (!gameStarted) return

    const state = gameStateRef.current

    // Move ball
    state.ballX += state.ballSpeedX
    state.ballY += state.ballSpeedY

    // Ball collision with top/bottom
    if (state.ballY <= 0 || state.ballY >= state.canvasHeight) {
      state.ballSpeedY = -state.ballSpeedY
    }

    // Ball collision with player paddle
    if (
      state.ballX <= 20 &&
      state.ballY >= state.playerY &&
      state.ballY <= state.playerY + state.paddleHeight
    ) {
      state.ballSpeedX = Math.abs(state.ballSpeedX) * 1.05
      state.ballSpeedY += (state.ballY - (state.playerY + state.paddleHeight / 2)) * 0.1
    }

    // Ball collision with computer paddle
    if (
      state.ballX >= state.canvasWidth - 20 &&
      state.ballY >= state.computerY &&
      state.ballY <= state.computerY + state.paddleHeight
    ) {
      state.ballSpeedX = -Math.abs(state.ballSpeedX) * 1.05
      state.ballSpeedY += (state.ballY - (state.computerY + state.paddleHeight / 2)) * 0.1
    }

    // Computer AI
    const computerCenter = state.computerY + state.paddleHeight / 2
    if (computerCenter < state.ballY - 35) {
      state.computerY += 3
    } else if (computerCenter > state.ballY + 35) {
      state.computerY -= 3
    }

    // Ball out of bounds
    if (state.ballX < 0) {
      setScore((s) => ({ ...s, computer: s.computer + 1 }))
      state.ballX = state.canvasWidth / 2
      state.ballY = state.canvasHeight / 2
      state.ballSpeedX = 4
      state.ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1)
    } else if (state.ballX > state.canvasWidth) {
      setScore((s) => ({ ...s, player: s.player + 1 }))
      state.ballX = state.canvasWidth / 2
      state.ballY = state.canvasHeight / 2
      state.ballSpeedX = -4
      state.ballSpeedY = 4 * (Math.random() > 0.5 ? 1 : -1)
    }

    draw()
  }

  useEffect(() => {
    if (!gameStarted) {
      draw()
      return
    }

    const gameLoop = () => {
      update()
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameStarted])

  // Initial draw
  useEffect(() => {
    draw()
  }, [])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between items-center w-full max-w-2xl">
        <div className="text-xl font-bold">
          You: <span className="text-green-500">{score.player}</span>
        </div>
        <Button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-black"
        >
          {gameStarted ? "Restart" : "Start Game"}
        </Button>
        <div className="text-xl font-bold">
          CPU: <span className="text-red-500">{score.computer}</span>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border border-green-500/20 rounded"
      />

      {!gameStarted && (
        <div className="text-center text-gray-400">
          <p>Move your mouse up and down to control the paddle</p>
          <p>First to 10 points wins!</p>
        </div>
      )}
    </div>
  )
}
