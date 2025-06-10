"use client"

import type React from "react"
import type { Trainee } from "../types/trainee"
// Remover esta linha: import "./RankingSlot.css"

interface RankingSlotProps {
  position: number
  trainee: Trainee | null
  onRemove: (trainee: Trainee) => void
  onDragStart: () => void
  onDragEnd: () => void
  onDrop: () => void
  isDragging: boolean
  showEliminated: boolean
  showTop8: boolean
  style?: React.CSSProperties
  isCenter?: boolean
  size?: "small" | "medium" | "large"
}

const getPositionClass = (position: number) => {
  if (position === 1) return "position-1"
  if (position === 2) return "position-2"
  if (position === 3) return "position-3"
  return "position-default"
}

const gradeColors = {
  A: "grade-a",
  B: "grade-b",
  C: "grade-c",
  D: "grade-d",
  F: "grade-f",
}

const getAvatarSize = (size = "medium", isCenter = false) => {
  if (isCenter) return "7rem"

  switch (size) {
    case "large":
      return "6rem"
    case "medium":
      return "4.5rem"
    case "small":
      return "3.5rem"
    default:
      return "4.5rem"
  }
}

const getBadgeSize = (size = "medium", isCenter = false) => {
  if (isCenter) return "3rem"

  switch (size) {
    case "large":
      return "2.5rem"
    case "medium":
      return "2rem"
    case "small":
      return "1.75rem"
    default:
      return "2rem"
  }
}

export const RankingSlot: React.FC<RankingSlotProps> = ({
  position,
  trainee,
  onRemove,
  onDragStart,
  onDragEnd,
  onDrop,
  isDragging,
  showEliminated,
  showTop8,
  style,
  isCenter = false,
  size = "medium",
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const avatarSize = getAvatarSize(size, isCenter)
  const badgeSize = getBadgeSize(size, isCenter)

  return (
    <div className="ranking-slot" style={style}>
      <div
        className={`ranking-avatar-container ${trainee ? gradeColors[trainee.grade] : "empty"} ${
          isDragging ? "dragging" : ""
        } ${isCenter ? "center-position" : ""} ${size === "large" ? "large-position" : ""}`}
        style={{ width: avatarSize, height: avatarSize }}
        draggable={!!trainee}
        onDragStart={trainee ? onDragStart : undefined}
        onDragEnd={onDragEnd}
        onDragOver={handleDragOver}
        onDrop={onDrop}
      >
        {/* Enhanced glow for center position */}
        <div className={`star-glow ${isCenter ? "center-glow" : ""}`}></div>

        {trainee ? (
          <>
            <img
              src={trainee.image || "https://via.placeholder.com/80x80"}
              alt={trainee.name}
              className={`ranking-image ${trainee.eliminated && showEliminated ? "grayscale" : ""}`}
            />

            {/* Top 8 Crown */}
            {showTop8 && trainee.top12 && (
              <div className="crown-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
            )}

            {/* Remove Button */}
            <button
              className="remove-button"
              onClick={(e) => {
                e.stopPropagation()
                onRemove(trainee)
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </>
        ) : (
          <div className="empty-slot">
            <svg
              width={isCenter ? "32" : "24"}
              height={isCenter ? "32" : "24"}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              <polygon points="12,8 18,12 12,16 6,12" />
            </svg>
          </div>
        )}
      </div>

      {/* Position Badge */}
      <div
        className={`position-badge ${getPositionClass(position)} ${isCenter ? "center-badge" : ""}`}
        style={{ width: badgeSize, height: badgeSize }}
      >
        {position}
      </div>

      {/* Trainee Info */}
      {trainee && (
        <div className={`ranking-info ${isCenter ? "center-info" : ""}`}>
          <p className="ranking-name">{trainee.name}</p>
          <p className="ranking-company">{trainee.company}</p>
        </div>
      )}
    </div>
  )
}
