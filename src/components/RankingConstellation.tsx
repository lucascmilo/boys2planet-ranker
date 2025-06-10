"use client"

import type React from "react"
import { useState, useRef } from "react"
import { RankingSlot } from "./RankingSlot"
import type { Trainee } from "../types/trainee"
// Remover esta linha: import "./RankingConstellation.css"

interface RankingConstellationProps {
  ranking: (Trainee | null)[]
  onRemoveTrainee: (trainee: Trainee) => void
  onSwapPositions: (fromIndex: number, toIndex: number) => void
  showEliminated: boolean
  showTop8: boolean
}

// Formation positions for 8 members in a beautiful K-pop style formation
const getFormationPosition = (index: number) => {
  const positions = [
    // Center position (1st place) - front and center
    { x: 50, y: 65, isCenter: true, size: "large" as const },
    // Second row - 2nd and 3rd place flanking the center
    { x: 25, y: 50, isCenter: false, size: "medium" as const },
    { x: 75, y: 50, isCenter: false, size: "medium" as const },
    // Third row - 4th, 5th, 6th place
    { x: 15, y: 35, isCenter: false, size: "small" as const },
    { x: 50, y: 30, isCenter: false, size: "medium" as const },
    { x: 85, y: 35, isCenter: false, size: "small" as const },
    // Back row - 7th and 8th place
    { x: 35, y: 15, isCenter: false, size: "small" as const },
    { x: 65, y: 15, isCenter: false, size: "small" as const },
  ]

  return positions[index] || { x: 50, y: 50, isCenter: false, size: "medium" as const }
}

export const RankingConstellation: React.FC<RankingConstellationProps> = ({
  ranking,
  onRemoveTrainee,
  onSwapPositions,
  showEliminated,
  showTop8,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const constellationRef = useRef<HTMLDivElement>(null)

  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      onSwapPositions(draggedIndex, targetIndex)
    }
    setDraggedIndex(null)
  }

  const downloadRanking = async () => {
    if (!constellationRef.current) return

    try {
      // Hide interactive elements before capture
      const removeButtons = constellationRef.current.querySelectorAll(".remove-button")
      const instructions = constellationRef.current.querySelector(".ranking-instructions")

      removeButtons.forEach((btn) => ((btn as HTMLElement).style.opacity = "0"))
      if (instructions) (instructions as HTMLElement).style.display = "none"

      // Create a canvas to draw the ranking
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) throw new Error("Could not get canvas context")

      // Set canvas size
      canvas.width = 800
      canvas.height = 600

      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#1a0b2e")
      gradient.addColorStop(0.5, "#16213e")
      gradient.addColorStop(1, "#0f3460")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw title
      ctx.fillStyle = "#e879f9"
      ctx.font = "bold 24px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("BOYS II PLANET CONSTELLATION", canvas.width / 2, 40)

      // Draw ranking positions with trainee info
      const positions = [
        { x: 400, y: 390, size: 80, isCenter: true }, // Center
        { x: 200, y: 300, size: 60 }, // 2nd
        { x: 600, y: 300, size: 60 }, // 3rd
        { x: 120, y: 210, size: 50 }, // 4th
        { x: 400, y: 180, size: 60 }, // 5th
        { x: 680, y: 210, size: 50 }, // 6th
        { x: 280, y: 90, size: 50 }, // 7th
        { x: 520, y: 90, size: 50 }, // 8th
      ]

      for (let i = 0; i < ranking.length; i++) {
        const trainee = ranking[i]
        const pos = positions[i]
        if (!trainee || !pos) continue

        // Draw position circle
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, pos.size / 2, 0, 2 * Math.PI)

        // Grade colors
        const gradeColors = {
          A: "#ec4899",
          B: "#a855f7",
          C: "#3b82f6",
          D: "#06b6d4",
          F: "#6b7280",
        }

        ctx.fillStyle = gradeColors[trainee.grade] || "#6b7280"
        ctx.fill()
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = pos.isCenter ? 4 : 2
        ctx.stroke()

        // Draw position number
        ctx.fillStyle = "#ffffff"
        ctx.font = `bold ${pos.isCenter ? "20px" : "16px"} Inter, sans-serif`
        ctx.textAlign = "center"
        ctx.fillText((i + 1).toString(), pos.x, pos.y - pos.size / 2 - 15)

        // Draw trainee name
        ctx.fillStyle = "#e879f9"
        ctx.font = `${pos.isCenter ? "14px" : "12px"} Inter, sans-serif`
        ctx.fillText(trainee.name, pos.x, pos.y + pos.size / 2 + 20)

        // Draw company
        ctx.fillStyle = "#c084fc"
        ctx.font = `${pos.isCenter ? "12px" : "10px"} Inter, sans-serif`
        ctx.fillText(trainee.company, pos.x, pos.y + pos.size / 2 + 35)
      }

      // Restore interactive elements
      removeButtons.forEach((btn) => ((btn as HTMLElement).style.opacity = ""))
      if (instructions) (instructions as HTMLElement).style.display = ""

      // Download the image
      const link = document.createElement("a")
      link.download = `boys-ii-planet-top8-${new Date().toISOString().split("T")[0]}.png`
      link.href = canvas.toDataURL("image/png", 1.0)
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
      alert("Failed to generate image. Please try again.")
    }
  }

  return (
    <div className="ranking-constellation-container">
      <div className="card">
        <div className="card-header">
          <h3 className="ranking-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              <polygon points="12,8 18,12 12,16 6,12" />
            </svg>
            BOYS II PLANET CONSTELLATION
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              <polygon points="12,8 18,12 12,16 6,12" />
            </svg>
          </h3>
          <button className="download-button" onClick={downloadRanking}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Image
          </button>
        </div>
        <div className="card-content">
          <div ref={constellationRef} className="constellation-container">
            {/* Formation lines connecting positions */}
            <svg className="constellation-lines" viewBox="0 0 100 100">
              {/* Connecting lines for formation */}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.3)" />
                  <stop offset="50%" stopColor="rgba(236, 72, 153, 0.3)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0.3)" />
                </linearGradient>
              </defs>

              {/* Formation connecting lines */}
              <line x1="50" y1="65" x2="25" y2="50" stroke="url(#lineGradient)" strokeWidth="0.5" />
              <line x1="50" y1="65" x2="75" y2="50" stroke="url(#lineGradient)" strokeWidth="0.5" />
              <line x1="25" y1="50" x2="15" y2="35" stroke="url(#lineGradient)" strokeWidth="0.3" />
              <line x1="25" y1="50" x2="50" y2="30" stroke="url(#lineGradient)" strokeWidth="0.3" />
              <line x1="75" y1="50" x2="85" y2="35" stroke="url(#lineGradient)" strokeWidth="0.3" />
              <line x1="75" y1="50" x2="50" y2="30" stroke="url(#lineGradient)" strokeWidth="0.3" />
              <line x1="50" y1="30" x2="35" y2="15" stroke="url(#lineGradient)" strokeWidth="0.3" />
              <line x1="50" y1="30" x2="65" y2="15" stroke="url(#lineGradient)" strokeWidth="0.3" />

              {/* Decorative elements */}
              <circle
                cx="50"
                cy="40"
                r="25"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
                strokeDasharray="3,3"
              />
            </svg>

            <div className="constellation-grid">
              {ranking.map((trainee, index) => {
                const position = getFormationPosition(index)
                return (
                  <RankingSlot
                    key={index}
                    position={index + 1}
                    trainee={trainee}
                    onRemove={onRemoveTrainee}
                    onDragStart={() => handleDragStart(index)}
                    onDragEnd={handleDragEnd}
                    onDrop={() => handleDrop(index)}
                    isDragging={draggedIndex === index}
                    showEliminated={showEliminated}
                    showTop8={showTop8}
                    style={{
                      position: "absolute",
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    isCenter={position.isCenter}
                    size={position.size}
                  />
                )
              })}
            </div>
          </div>

          <div className="ranking-instructions">
            <p>Drag and drop to reorder • Click X to remove</p>
            <p className="ranking-subtitle">Center: #1 • Outer Ring: #2-8</p>
          </div>
        </div>
      </div>
    </div>
  )
}
