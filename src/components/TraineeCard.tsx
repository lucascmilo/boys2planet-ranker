"use client"

import type React from "react"
import type { Trainee } from "../types/trainee"
// Remover esta linha: import "./TraineeCard.css"

interface TraineeCardProps {
  trainee: Trainee
  showTop8: boolean
  onClick: () => void
}

const gradeColors = {
  A: "grade-a",
  B: "grade-b",
  C: "grade-c",
  D: "grade-d",
  F: "grade-f",
}

export const TraineeCard: React.FC<TraineeCardProps> = ({ trainee, showTop8, onClick }) => {
  return (
    <div
      className={`trainee-card ${trainee.selected ? "selected" : ""} ${trainee.eliminated ? "eliminated" : ""}`}
      onClick={onClick}
    >
      <div className="trainee-card-content">
        <div className="trainee-avatar-container">
          <div className={`trainee-avatar ${gradeColors[trainee.grade]}`}>
            <img
              src={trainee.image || "https://via.placeholder.com/80x80"}
              alt={trainee.name}
              className={`trainee-image ${trainee.eliminated ? "grayscale" : ""}`}
            />
          </div>

          {/* Grade Badge */}
          <div className={`grade-badge ${gradeColors[trainee.grade]}`}>{trainee.grade}</div>

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

          {/* Selected Check */}
          {trainee.selected && (
            <div className="selected-overlay">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>
          )}
        </div>

        <div className="trainee-info">
          <h3 className="trainee-name">{trainee.name}</h3>
          <p className="trainee-korean">{trainee.nameKorean}</p>
          <div className="trainee-details">
            <span className="company-badge">{trainee.company}</span>
            <span className="birth-year">Born {trainee.birthYear}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
