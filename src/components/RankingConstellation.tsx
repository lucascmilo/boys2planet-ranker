"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { RankingSlot } from "./RankingSlot"
import type { Trainee } from "../types/trainee"

interface RankingConstellationProps {
  ranking: (Trainee | null)[]
  onRemoveTrainee: (trainee: Trainee) => void
  onSwapPositions: (fromIndex: number, toIndex: number) => void
  showEliminated: boolean
  showTop8: boolean
}

// Desktop: Compact diamond constellation formation positions
const getDesktopFormationPosition = (index: number) => {
  const positions = [
    // 1st place (top center)
    { x: 50, y: 20, isCenter: false, size: "small" as const },
    // 2nd and 3rd place (second row)
    { x: 35, y: 40, isCenter: false, size: "small" as const },
    { x: 65, y: 40, isCenter: false, size: "small" as const },
    // 4th, 5th, 6th place (third row) - POSIÇÕES AJUSTADAS: 20%, 50%, 80%
    { x: 20, y: 65, isCenter: false, size: "small" as const },
    { x: 50, y: 65, isCenter: false, size: "small" as const },
    { x: 80, y: 65, isCenter: false, size: "small" as const },
    // 7th and 8th place (bottom row)
    { x: 35, y: 85, isCenter: false, size: "small" as const },
    { x: 65, y: 85, isCenter: false, size: "small" as const },
  ]

  return positions[index] || { x: 50, y: 50, isCenter: false, size: "small" as const }
}

// Mobile: Pyramid formation (1-3-4) com espaçamento vertical equalizado
const getMobileFormationPosition = (index: number) => {
  const positions = [
    // 1st place (top center)
    { x: 50, y: 15, isCenter: false, size: "small" as const },
    // 2nd, 3rd, 4th place (middle row - 3 positions)
    { x: 20, y: 40, isCenter: false, size: "small" as const },
    { x: 50, y: 40, isCenter: false, size: "small" as const },
    { x: 80, y: 40, isCenter: false, size: "small" as const },
    // 5th, 6th, 7th, 8th place (bottom row - 4 positions)
    { x: 15, y: 65, isCenter: false, size: "small" as const },
    { x: 38, y: 65, isCenter: false, size: "small" as const },
    { x: 62, y: 65, isCenter: false, size: "small" as const },
    { x: 85, y: 65, isCenter: false, size: "small" as const },
  ]

  return positions[index] || { x: 50, y: 50, isCenter: false, size: "small" as const }
}

const getGradeDisplay = (grade: string) => {
  switch (grade) {
    case "all star":
      return "★"
    case "2 star":
      return "2"
    case "1 star":
      return "1"
    case "0 star":
      return "0"
    default:
      return grade
  }
}

export const RankingConstellation: React.FC<RankingConstellationProps> = ({
  ranking,
  onRemoveTrainee,
  onSwapPositions,
  showEliminated,
  showTop8,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const constellationRef = useRef<HTMLDivElement>(null)

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getFormationPosition = (index: number) => {
    return isMobile ? getMobileFormationPosition(index) : getDesktopFormationPosition(index)
  }

  const handleSlotClick = (index: number) => {
    if (selectedSlot === null) {
      // First click - select this slot if it has a trainee
      if (ranking[index]) {
        setSelectedSlot(index)
      }
    } else if (selectedSlot === index) {
      // Clicking the same slot - deselect
      setSelectedSlot(null)
    } else {
      // Second click - swap positions
      onSwapPositions(selectedSlot, index)
      setSelectedSlot(null)
    }
  }

  const removeFromRanking = (trainee: Trainee) => {
    onRemoveTrainee(trainee)
    setSelectedSlot(null) // Reset selection when removing a trainee
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

    // Always use desktop positions for canvas (download)
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
      "all star": "#8c46ba",
      "2 star": "#80c997",
      "1 star": "#facf73",
      "0 star": "#4a4a4a",
      "?": "#ffffff",
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
      // Simplified text rendering for trainee name
      ctx.fillStyle = "#e879f9"
      ctx.font = `bold ${position <= 3 ? "18px" : "16px"} Inter, sans-serif`
      ctx.textAlign = "center"

      // Draw trainee name as a single line
      const nameY = pos.y + pos.size / 2 + 60
      ctx.fillText(trainee.name, pos.x, nameY)

      // Draw company name at fixed position below the name
      ctx.fillStyle = "#c084fc"
      ctx.font = `${position <= 3 ? "14px" : "12px"} Inter, sans-serif`
      ctx.fillText(trainee.company, pos.x, nameY + 20)

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
      ctx.fillText(getGradeDisplay(trainee.grade), pos.x + pos.size / 2 - 15, pos.y - pos.size / 2 + 20)
    }
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

  // Render different SVG lines based on screen size
  const renderConstellationLines = () => {
    if (isMobile) {
      // Mobile pyramid lines (1-3-4) with updated positions
      return (
        <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.2)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.2)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)" />
            </linearGradient>
          </defs>

          {/* Top to middle row (1 to 3 positions) */}
          <line x1="50" y1="15" x2="20" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="50" y1="15" x2="50" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="50" y1="15" x2="80" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />

          {/* Middle row connections (3 positions) */}
          <line x1="20" y1="40" x2="50" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="50" y1="40" x2="80" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />

          {/* Middle row to bottom row (3 to 4 positions) */}
          <line x1="20" y1="40" x2="15" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="20" y1="40" x2="38" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="50" y1="40" x2="38" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="50" y1="40" x2="62" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="80" y1="40" x2="62" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="80" y1="40" x2="85" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />

          {/* Bottom row connections (4 positions) */}
          <line x1="15" y1="65" x2="38" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="38" y1="65" x2="62" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="62" y1="65" x2="85" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
        </svg>
      )
    } else {
      // Desktop diamond lines
      return (
        <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.2)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.2)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)" />
            </linearGradient>
          </defs>

          <line x1="50" y1="20" x2="35" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="50" y1="20" x2="65" y2="40" stroke="url(#lineGradient)" strokeWidth="0.3" />
          <line x1="35" y1="40" x2="20" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="35" y1="40" x2="50" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="65" y1="40" x2="80" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="65" y1="40" x2="50" y2="65" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="20" y1="65" x2="35" y2="85" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="50" y1="65" x2="35" y2="85" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="50" y1="65" x2="65" y2="85" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="80" y1="65" x2="65" y2="85" stroke="url(#lineGradient)" strokeWidth="0.2" />
        </svg>
      )
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
            {renderConstellationLines()}

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
                    onRemove={removeFromRanking}
                    onClick={() => handleSlotClick(index)}
                    isSelected={selectedSlot === index}
                    showEliminated={showEliminated}
                    showTop8={showTop8}
                    isMobile={isMobile}
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
            <p>Click to select • Click another to swap • Click X to remove</p>
          </div>
        </div>
      </div>
    </div>
  )
}
