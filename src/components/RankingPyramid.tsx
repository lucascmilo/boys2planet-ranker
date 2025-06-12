"use client"

import type React from "react"
import { useState } from "react"
import { RankingSlot } from "./RankingSlot"
import type { Trainee } from "../types/trainee"

interface RankingPyramidProps {
  ranking: (Trainee | null)[]
  onRemoveTrainee: (trainee: Trainee) => void
  onSwapPositions: (fromIndex: number, toIndex: number) => void
  showEliminated: boolean
  showTop8: boolean
}

// Pyramid structure for 8 members
const pyramidStructure = [
  { row: 0, positions: [0] }, // 1st place (center top)
  { row: 1, positions: [1, 2] }, // 2nd, 3rd (second row)
  { row: 2, positions: [3, 4, 5] }, // 4th, 5th, 6th (third row)
  { row: 3, positions: [6, 7] }, // 7th, 8th (bottom row)
]

export const RankingPyramid: React.FC<RankingPyramidProps> = ({
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
    <div className="ranking-pyramid-container">
      <div className="card">
        <div className="card-header">
          <h3 className="ranking-title">⭐ TOP 8 LINEUP ⭐</h3>
        </div>
        <div className="card-content">
          {/* Constellation lines */}
          <div className="constellation-container">
            <svg className="constellation-lines" viewBox="0 0 100 100">
              {/* Constellation lines connecting the positions */}
              <line x1="50" y1="15" x2="35" y2="35" stroke="white" strokeWidth="0.3" />
              <line x1="50" y1="15" x2="65" y2="35" stroke="white" strokeWidth="0.3" />
              <line x1="35" y1="35" x2="65" y2="35" stroke="white" strokeWidth="0.3" />
              <line x1="35" y1="35" x2="25" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="35" y1="35" x2="50" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="65" y1="35" x2="50" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="65" y1="35" x2="75" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="25" y1="60" x2="50" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="50" y1="60" x2="75" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="35" y1="85" x2="25" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="35" y1="85" x2="50" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="65" y1="85" x2="50" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="65" y1="85" x2="75" y2="60" stroke="white" strokeWidth="0.3" />
              <line x1="35" y1="85" x2="65" y2="85" stroke="white" strokeWidth="0.3" />
            </svg>

            <div className="pyramid-grid">
              {pyramidStructure.map(({ row, positions }) => (
                <div key={row} className="pyramid-row">
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
