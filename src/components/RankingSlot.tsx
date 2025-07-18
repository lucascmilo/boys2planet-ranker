"use client"

import type React from "react"
import type { Trainee } from "../types/trainee"

interface RankingSlotProps {
  position: number
  trainee: Trainee | null
  onRemove: (trainee: Trainee) => void
  onClick: () => void
  isSelected: boolean
  showEliminated: boolean
  showTop8: boolean
  style?: React.CSSProperties
  isCenter?: boolean
  size?: "small" | "medium" | "large"
  isMobile?: boolean
}

const getPositionClass = (position: number) => {
  if (position === 1) return "position-1"
  if (position === 2) return "position-2"
  if (position === 3) return "position-3"
  return "position-default"
}

const gradeColors = {
  "all star": "grade-all-star",
  "2 star": "grade-2-star",
  "1 star": "grade-1-star",
  "0 star": "grade-0-star",
  "?": "grade-?",
}

// All slots now have the same size
const getAvatarSize = () => {
  return "4.5rem" // Same size for all
}

const getBadgeSize = () => {
  return "1.75rem" // Updated smaller size for all
}

export const RankingSlot: React.FC<RankingSlotProps> = ({
  position,
  trainee,
  onRemove,
  onClick,
  isSelected,
  showEliminated,
  showTop8,
  style,
  isCenter = false,
  size = "medium",
  isMobile = false,
}) => {
  const avatarSize = getAvatarSize()
  const badgeSize = getBadgeSize()

  return (
    <div className="ranking-slot" style={style}>
      <div
        className={`ranking-avatar-container ${trainee ? gradeColors[trainee.grade] : "empty"} ${
          isSelected ? "selected" : ""
        }`}
        style={{ width: avatarSize, height: avatarSize }}
        onClick={onClick}
      >
        {/* Star glow - same for all positions */}
        <div className="star-glow"></div>

        {trainee ? (
          <>
            <img
              src={trainee.image || "/placeholder.svg?height=80&width=80"}
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              <polygon points="12,8 18,12 12,16 6,12" />
            </svg>
          </div>
        )}

        {/* Position Badge - Always rendered last to ensure it's on top */}
        <div
          className={`position-badge overlay-badge ${getPositionClass(position)}`}
          style={{
            width: isMobile ? "1.75rem" : badgeSize,
            height: isMobile ? "1.75rem" : badgeSize,
            fontSize: isMobile ? "0.875rem" : "var(--font-size-sm)",
          }}
        >
          {position}
        </div>
      </div>

      {/* Trainee Info - Always visible */}
      {trainee && (
        <div className={`ranking-info ${isMobile ? "mobile-info" : ""}`}>
          <p className="ranking-name">{trainee.name}</p>
          <p className="ranking-company">{trainee.company}</p>
        </div>
      )}
    </div>
  )
}
