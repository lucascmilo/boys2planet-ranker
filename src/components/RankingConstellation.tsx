"use client"

import type React from "react"
import { useState, useRef } from "react"
import { RankingSlot } from "./RankingSlot"
import type { Trainee } from "../types/trainee"

interface RankingConstellationProps {
  ranking: (Trainee | null)[]
  onRemoveTrainee: (trainee: Trainee) => void
  onSwapPositions: (fromIndex: number, toIndex: number) => void
  showEliminated: boolean
  showTop8: boolean
}

// Updated constellation formation positions - all same size
const getFormationPosition = (index: number) => {
  const positions = [
    // Top row - 1st place (center)
    { x: 50, y: 20, isCenter: false, size: "medium" as const },
    // Second row - 2nd and 3rd place
    { x: 35, y: 40, isCenter: false, size: "medium" as const },
    { x: 65, y: 40, isCenter: false, size: "medium" as const },
    // Third row - 4th, 5th, 6th place
    { x: 15, y: 60, isCenter: false, size: "medium" as const },
    { x: 50, y: 60, isCenter: false, size: "medium" as const },
    { x: 85, y: 60, isCenter: false, size: "medium" as const },
    // Bottom row - 7th and 8th place
    { x: 32.5, y: 80, isCenter: false, size: "medium" as const },
    { x: 67.5, y: 80, isCenter: false, size: "medium" as const },
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
  const [isDownloading, setIsDownloading] = useState(false)
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
    setIsDownloading(true)

    try {
      await generateHighQualityImage()
    } catch (error) {
      console.error("Error generating image:", error)
      alert("Failed to generate image. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const generateHighQualityImage = async () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Could not get canvas context")

    // High resolution canvas
    const scale = 3
    canvas.width = 1200 * scale
    canvas.height = 800 * scale
    ctx.scale(scale, scale)

    // Enable high quality rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    // Draw background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800)
    gradient.addColorStop(0, "#1a0b2e")
    gradient.addColorStop(0.3, "#16213e")
    gradient.addColorStop(0.7, "#0f3460")
    gradient.addColorStop(1, "#1a0b2e")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1200, 800)

    // Add subtle pattern overlay
    const patternGradient = ctx.createRadialGradient(600, 400, 0, 600, 400, 600)
    patternGradient.addColorStop(0, "rgba(168, 85, 247, 0.1)")
    patternGradient.addColorStop(0.5, "rgba(236, 72, 153, 0.05)")
    patternGradient.addColorStop(1, "rgba(168, 85, 247, 0.02)")
    ctx.fillStyle = patternGradient
    ctx.fillRect(0, 0, 1200, 800)

    // Draw title with glow effect
    ctx.shadowColor = "#e879f9"
    ctx.shadowBlur = 20
    ctx.fillStyle = "#e879f9"
    ctx.font = "bold 36px Inter, sans-serif"
    ctx.textAlign = "center"
    ctx.fillText("BOYS II PLANET CONSTELLATION", 600, 70)

    // Reset shadow
    ctx.shadowBlur = 0

    // Draw subtitle
    ctx.fillStyle = "#c084fc"
    ctx.font = "18px Inter, sans-serif"
    ctx.fillText("My Top 8 Lineup", 600, 100)

    // Draw date
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
    ctx.font = "14px Inter, sans-serif"
    ctx.fillText(`Created on ${new Date().toLocaleDateString()}`, 600, 120)

    // Updated position mapping for constellation layout - all same size
    const canvasPositions = [
      { x: 600, y: 200, size: 90, isCenter: false, rank: 1 }, // 1st - same size as others
      { x: 420, y: 320, size: 90, isCenter: false, rank: 2 }, // 2nd
      { x: 780, y: 320, size: 90, isCenter: false, rank: 3 }, // 3rd
      { x: 200, y: 480, size: 90, isCenter: false, rank: 4 }, // 4th
      { x: 600, y: 450, size: 90, isCenter: false, rank: 5 }, // 5th
      { x: 1000, y: 480, size: 90, isCenter: false, rank: 6 }, // 6th
      { x: 400, y: 620, size: 90, isCenter: false, rank: 7 }, // 7th
      { x: 800, y: 620, size: 90, isCenter: false, rank: 8 }, // 8th
    ]

    // Draw connecting constellation lines
    ctx.strokeStyle = "rgba(168, 85, 247, 0.3)"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])

    // Connect positions in a star pattern
    const connections = [
      [0, 1],
      [0, 2], // Center to 2nd and 3rd
      [1, 3],
      [1, 4], // 2nd to 4th and 5th
      [2, 5],
      [2, 4], // 3rd to 6th and 5th
      [4, 6],
      [4, 7], // 5th to 7th and 8th
    ]

    connections.forEach(([from, to]) => {
      if (canvasPositions[from] && canvasPositions[to]) {
        ctx.beginPath()
        ctx.moveTo(canvasPositions[from].x, canvasPositions[from].y)
        ctx.lineTo(canvasPositions[to].x, canvasPositions[to].y)
        ctx.stroke()
      }
    })

    ctx.setLineDash([]) // Reset line dash

    // Draw each trainee - await all image loading
    for (let i = 0; i < ranking.length; i++) {
      const trainee = ranking[i]
      const pos = canvasPositions[i]
      if (!pos) continue

      await drawTraineeOnCanvas(ctx, trainee, pos, i + 1)
    }

    // Add decorative elements
    drawDecorations(ctx)

    // Add watermark
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "right"
    ctx.fillText("boys2planet-ranker.netlify.app", 1180, 780)

    // Download the image
    const link = document.createElement("a")
    link.download = `boys-ii-planet-constellation-${new Date().toISOString().split("T")[0]}.png`
    link.href = canvas.toDataURL("image/png", 1.0)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const drawTraineeOnCanvas = async (
    ctx: CanvasRenderingContext2D,
    trainee: Trainee | null,
    pos: { x: number; y: number; size: number; isCenter: boolean; rank: number },
    position: number,
  ) => {
    const gradeColors = {
      A: "#ec4899",
      B: "#a855f7",
      C: "#3b82f6",
      D: "#06b6d4",
      F: "#6b7280",
      "?": "#6b7280",
    }

    const rankColors = {
      1: "#fbbf24", // Gold
      2: "#e5e7eb", // Silver
      3: "#cd7f32", // Bronze
    }

    if (trainee) {
      // Load and draw trainee image
      try {
        const img = new Image()
        img.crossOrigin = "anonymous"

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error(`Failed to load image: ${trainee.image}`))
          img.src = trainee.image || "/placeholder.svg?height=80&width=80"
        })

        // Draw circular clipped image
        ctx.save()
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, pos.size / 2, 0, 2 * Math.PI)
        ctx.clip()

        // Draw the image
        ctx.drawImage(img, pos.x - pos.size / 2, pos.y - pos.size / 2, pos.size, pos.size)
        ctx.restore()

        // Draw border
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, pos.size / 2, 0, 2 * Math.PI)
        ctx.strokeStyle = position <= 3 ? rankColors[position as 1 | 2 | 3] : "#ffffff"
        ctx.lineWidth = position <= 3 ? 6 : 4
        ctx.stroke()
      } catch (error) {
        console.warn(`Failed to load image for ${trainee.name}:`, error)

        // Fallback: draw colored circle if image fails to load
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, pos.size / 2, 0, 2 * Math.PI)
        ctx.fillStyle = gradeColors[trainee.grade] || "#6b7280"
        ctx.fill()
        ctx.strokeStyle = position <= 3 ? rankColors[position as 1 | 2 | 3] : "#ffffff"
        ctx.lineWidth = position <= 3 ? 6 : 4
        ctx.stroke()
      }
    } else {
      // Empty slot styling
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, pos.size / 2, 0, 2 * Math.PI)
      ctx.fillStyle = "rgba(42, 27, 74, 0.5)"
      ctx.fill()
      ctx.strokeStyle = "#4b5563"
      ctx.lineWidth = 4
      ctx.stroke()
    }

    // Draw position number below the circle
    ctx.fillStyle = position <= 3 ? rankColors[position as 1 | 2 | 3] : "#ffffff"
    ctx.font = `bold ${position <= 3 ? "24px" : "20px"} Inter, sans-serif`
    ctx.textAlign = "center"

    // Add shadow for position number
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
    ctx.shadowBlur = 4
    ctx.fillText(position.toString(), pos.x, pos.y + pos.size / 2 + 35)
    ctx.shadowBlur = 0

    if (trainee) {
      // Draw trainee name with word wrapping
      ctx.fillStyle = "#e879f9"
      ctx.font = `bold ${position <= 3 ? "18px" : "16px"} Inter, sans-serif`

      const nameY = pos.y + pos.size / 2 + 60
      drawWrappedText(ctx, trainee.name, pos.x, nameY, pos.size + 60, 22)

      // Draw company name
      ctx.fillStyle = "#c084fc"
      ctx.font = `${position <= 3 ? "14px" : "12px"} Inter, sans-serif`

      const companyY = nameY + (trainee.name.split(" ").length > 1 ? 25 : 15)
      drawWrappedText(ctx, trainee.company, pos.x, companyY, pos.size + 80, 18)

      // Draw grade badge
      const badgeSize = 28
      ctx.beginPath()
      ctx.arc(pos.x + pos.size / 2 - 15, pos.y - pos.size / 2 + 15, badgeSize / 2, 0, 2 * Math.PI)
      ctx.fillStyle = gradeColors[trainee.grade]
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 3
      ctx.stroke()

      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px Inter, sans-serif"
      ctx.fillText(trainee.grade, pos.x + pos.size / 2 - 15, pos.y - pos.size / 2 + 20)
    }
  }

  const drawWrappedText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
  ) => {
    const words = text.split(" ")
    let line = ""
    let currentY = y

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " "
      const metrics = ctx.measureText(testLine)
      const testWidth = metrics.width

      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, currentY)
        line = words[n] + " "
        currentY += lineHeight
      } else {
        line = testLine
      }
    }
    ctx.fillText(line.trim(), x, currentY)
  }

  const drawDecorations = (ctx: CanvasRenderingContext2D) => {
    // Draw corner decorations
    const corners = [
      { x: 50, y: 50 },
      { x: 1150, y: 50 },
      { x: 50, y: 750 },
      { x: 1150, y: 750 },
    ]

    corners.forEach((corner) => {
      ctx.strokeStyle = "rgba(168, 85, 247, 0.3)"
      ctx.lineWidth = 2

      // Draw corner brackets
      ctx.beginPath()
      ctx.moveTo(corner.x - 20, corner.y)
      ctx.lineTo(corner.x, corner.y)
      ctx.lineTo(corner.x, corner.y - 20)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(corner.x + 20, corner.y)
      ctx.lineTo(corner.x, corner.y)
      ctx.lineTo(corner.x, corner.y + 20)
      ctx.stroke()
    })

    // Draw small stars
    const stars = [
      { x: 150, y: 150 },
      { x: 1050, y: 150 },
      { x: 150, y: 650 },
      { x: 1050, y: 650 },
      { x: 600, y: 140 },
    ]

    stars.forEach((star) => {
      drawStar(ctx, star.x, star.y, 8, 5, 4)
    })
  }

  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    outerRadius: number,
    innerRadius: number,
    points: number,
  ) => {
    ctx.fillStyle = "rgba(251, 191, 36, 0.6)"
    ctx.beginPath()

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (i * Math.PI) / points
      const starX = x + Math.cos(angle) * radius
      const starY = y + Math.sin(angle) * radius

      if (i === 0) {
        ctx.moveTo(starX, starY)
      } else {
        ctx.lineTo(starX, starY)
      }
    }

    ctx.closePath()
    ctx.fill()
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
          <button className="download-button" onClick={downloadRanking} disabled={isDownloading}>
            {isDownloading ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Image
              </>
            )}
          </button>
        </div>
        <div className="card-content">
          <div ref={constellationRef} className="constellation-container">
            {/* Updated connecting lines to match new positions */}
            <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.2)" />
                  <stop offset="50%" stopColor="rgba(236, 72, 153, 0.2)" />
                  <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)" />
                </linearGradient>
              </defs>

              {/* Updated formation connecting lines - adjusted for new positions */}
              <line x1="50" y1="20" x2="35" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />
              <line x1="50" y1="20" x2="65" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />
              <line x1="35" y1="40" x2="15" y2="60" stroke="url(#lineGradient)" strokeWidth="0.2" />
              <line x1="35" y1="40" x2="50" y2="60" stroke="url(#lineGradient)" strokeWidth="0.2" />
              <line x1="65" y1="40" x2="85" y2="60" stroke="url(#lineGradient)" strokeWidth="0.2" />
              <line x1="65" y1="40" x2="50" y2="60" stroke="url(#lineGradient)" strokeWidth="0.2" />
              <line x1="50" y1="60" x2="32.5" y2="80" stroke="url(#lineGradient)" strokeWidth="0.2" />
              <line x1="50" y1="60" x2="67.5" y2="80" stroke="url(#lineGradient)" strokeWidth="0.2" />
            </svg>

            <div className="constellation-grid">
              {/* Always render all 8 slots to maintain consistent layout */}
              {Array.from({ length: 8 }, (_, index) => {
                const position = getFormationPosition(index)
                const trainee = ranking[index] || null
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
          </div>
        </div>
      </div>
    </div>
  )
}
