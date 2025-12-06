"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

export default function CubeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)
  const rotationRef = useRef({ x: 0.5, y: 0.5 })

  const drawCube = (ctx: CanvasRenderingContext2D, rotX: number, rotY: number) => {
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const size = 80

    // Clear canvas
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height)

    // Define cube vertices
    const vertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ]

    // Rotate and project vertices
    const projectedVertices = vertices.map(([x, y, z]) => {
      // Rotation around Y axis
      let xRot = x * Math.cos(rotY) - z * Math.sin(rotY)
      let zRot = x * Math.sin(rotY) + z * Math.cos(rotY)
      let yRot = y

      // Rotation around X axis
      let yFinal = yRot * Math.cos(rotX) - zRot * Math.sin(rotX)
      let zFinal = yRot * Math.sin(rotX) + zRot * Math.cos(rotX)
      let xFinal = xRot

      // Perspective projection
      const scale = 200 / (200 + zFinal * 50)
      const x2d = width / 2 + xFinal * size * scale
      const y2d = height / 2 + yFinal * size * scale

      return { x: x2d, y: y2d, z: zFinal }
    })

    // Define cube faces
    const faces = [
      { vertices: [0, 1, 2, 3], color: "#22c55e" }, // Front
      { vertices: [1, 5, 6, 2], color: "#16a34a" }, // Right
      { vertices: [5, 4, 7, 6], color: "#15803d" }, // Back
      { vertices: [4, 0, 3, 7], color: "#166534" }, // Left
      { vertices: [3, 2, 6, 7], color: "#14532d" }, // Top
      { vertices: [4, 5, 1, 0], color: "#052e16" }, // Bottom
    ]

    // Sort faces by average Z (painter's algorithm)
    const sortedFaces = faces
      .map((face) => ({
        ...face,
        avgZ:
          face.vertices.reduce((sum, i) => sum + projectedVertices[i].z, 0) /
          face.vertices.length,
      }))
      .sort((a, b) => a.avgZ - b.avgZ)

    // Draw faces
    sortedFaces.forEach((face) => {
      ctx.fillStyle = face.color
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 2

      ctx.beginPath()
      const firstVertex = projectedVertices[face.vertices[0]]
      ctx.moveTo(firstVertex.x, firstVertex.y)

      face.vertices.slice(1).forEach((i) => {
        const vertex = projectedVertices[i]
        ctx.lineTo(vertex.x, vertex.y)
      })

      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    })

    // Draw edges
    ctx.strokeStyle = "#22c55e"
    ctx.lineWidth = 2

    const edges = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 4],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ]

    edges.forEach(([start, end]) => {
      const v1 = projectedVertices[start]
      const v2 = projectedVertices[end]
      ctx.beginPath()
      ctx.moveTo(v1.x, v1.y)
      ctx.lineTo(v2.x, v2.y)
      ctx.stroke()
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      if (autoRotate && !isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + 0.01,
          y: rotationRef.current.y + 0.01,
        }
      }

      drawCube(ctx, rotationRef.current.x, rotationRef.current.y)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [autoRotate, isDragging])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true)
    setAutoRotate(false)
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastMousePos.current.x
    const deltaY = e.clientY - lastMousePos.current.y

    rotationRef.current = {
      x: rotationRef.current.x + deltaY * 0.01,
      y: rotationRef.current.y + deltaX * 0.01,
    }

    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="border border-green-500/20 rounded cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <div className="flex gap-4">
        <Button
          onClick={() => setAutoRotate(!autoRotate)}
          className="bg-green-500 hover:bg-green-600 text-black"
        >
          {autoRotate ? "Stop" : "Start"} Auto-Rotate
        </Button>
        <Button
          onClick={() => { rotationRef.current = { x: 0.5, y: 0.5 } }}
          variant="outline"
          className="border-green-500 text-green-500 hover:bg-green-500/10"
        >
          Reset View
        </Button>
      </div>

      <div className="text-center text-gray-400 text-sm">
        <p>Drag to rotate the cube</p>
        <p>Click Auto-Rotate to animate</p>
      </div>
    </div>
  )
}
