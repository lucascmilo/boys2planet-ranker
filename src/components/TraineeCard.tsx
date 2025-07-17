"use client"

import type React from "react"
import type { Trainee } from "../types/trainee"

interface TraineeCardProps {
  trainee: Trainee
  showTop8: boolean
  onClick: () => void
}

const gradeColors = {
  "all star": "grade-all-star", // All star - purple
  "2 star": "grade-2-star", // 2 star - green
  "1 star": "grade-1-star", // 1 star - yellow
  "?": "grade-?",
}

const getGradeDisplay = (grade: string) => {
  switch (grade) {
    case "all star":
      return "★"
    case "2 star":
      return "2"
    case "1 star":
      return "1"
    default:
      return grade
  }
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
          <div className={`grade-badge ${gradeColors[trainee.grade]}`}>{getGradeDisplay(trainee.grade)}</div>

          {/* Top 8 Crown - Ícone atualizado */}
          {showTop8 && trainee.top12 && (
            <div className="crown-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.562 3.266a.5.5 0 0 1 .876 0L14.5 8.5l5.5 1.5-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-1.5z" />
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
