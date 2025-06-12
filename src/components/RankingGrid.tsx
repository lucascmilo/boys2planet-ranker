"use client"

import type React from "react"
import { useState } from "react"
import { RankingSlot } from "./RankingSlot"
import type { Trainee } from "../types/trainee"

interface RankingGridProps {
  ranking: (Trainee | null)[]
  onRemoveTrainee: (trainee: Trainee) => void
  onSwapPositions: (fromIndex: number, toIndex: number) => void
  showEliminated: boolean
  showTop8: boolean
}

// Grid structure for 8 members (2x2x2x2)
const gridStructure = [
  { row: 0, positions: [0, 1] }, // 1st, 2nd
  { row: 1, positions: [2, 3] }, // 3rd, 4th
  { row: 2, positions: [4, 5] }, // 5th, 6th
  { row: 3, positions: [6, 7] }, // 7th, 8th
]

export const RankingGrid: React.FC<RankingGridProps> = ({
  ranking,
  onRemoveTrainee,
  onSwapPositions,
  showEliminated,
  showTop8,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

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

  return (
    <div className="ranking-grid-container">
      <div className="card">
        <div className="card-header">
          <h3 className="ranking-title">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
            TOP 8 LINEUP
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </h3>
        </div>
        <div className="card-content">
          {/* Connection lines */}
          <div className="connection-container">
            <svg className="connection-lines" viewBox="0 0 100 100">
              {/* Subtle connection lines between positions */}
              <line x1="25" y1="15" x2="75" y2="15" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="25" y1="35" x2="75" y2="35" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="25" y1="55" x2="75" y2="55" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="25" y1="75" x2="75" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="25" y1="15" x2="25" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="75" y1="15" x2="75" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </svg>

            <div className="ranking-grid">
              {gridStructure.map(({ row, positions }) => (
                <div key={row} className="ranking-row">
                  {positions.map((position) => (
                    <RankingSlot
                      key={position}
                      position={position + 1}
                      trainee={ranking[position]}
                      onRemove={onRemoveTrainee}
                      onClick={() => handleSlotClick(position)}
                      isSelected={selectedSlot === position}
                      showEliminated={showEliminated}
                      showTop8={showTop8}
                    />
                  ))}
                </div>
              ))}
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
