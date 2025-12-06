"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Player = "X" | "O" | null

export default function TicTacToe() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<Player | "draw" | null>(null)

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const checkWinner = (newBoard: Player[]) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a]
      }
    }
    if (newBoard.every((cell) => cell !== null)) {
      return "draw"
    }
    return null
  }

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        {!winner ? (
          <p className="text-xl font-bold">
            Current Player: <span className="text-green-500">{currentPlayer}</span>
          </p>
        ) : winner === "draw" ? (
          <p className="text-xl font-bold text-yellow-500">It's a Draw!</p>
        ) : (
          <p className="text-xl font-bold">
            Winner: <span className="text-green-500">{winner}</span>!
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-24 h-24 bg-zinc-800 border-2 border-green-500/20 hover:border-green-500/40 rounded-lg flex items-center justify-center text-4xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!cell || !!winner}
          >
            {cell && (
              <span className={cell === "X" ? "text-green-500" : "text-red-500"}>
                {cell}
              </span>
            )}
          </button>
        ))}
      </div>

      <Button
        onClick={resetGame}
        className="bg-green-500 hover:bg-green-600 text-black px-8"
      >
        New Game
      </Button>

      <div className="text-center text-gray-400 text-sm">
        <p>Click on any empty cell to place your mark</p>
        <p>Get three in a row to win!</p>
      </div>
    </div>
  )
}
