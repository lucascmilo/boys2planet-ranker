"use client"

import type React from "react"
import { TraineeCard } from "./TraineeCard"
import type { Trainee } from "../types/trainee"

interface TraineeListProps {
  trainees: Trainee[]
  searchQuery: string
  onSearchChange: (query: string) => void
  showEliminated: boolean
  onShowEliminatedChange: (show: boolean) => void
  showTop8: boolean
  onShowTop8Change: (show: boolean) => void
  onTraineeClick: (trainee: Trainee) => void
}

export const TraineeList: React.FC<TraineeListProps> = ({
  trainees,
  searchQuery,
  onSearchChange,
  showEliminated,
  onShowEliminatedChange,
  showTop8,
  onShowTop8Change,
  onTraineeClick,
}) => {
  return (
    <div className="trainee-list-container">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Trainees ({trainees.length})
          </h3>
        </div>
        <div className="card-content">
          {/* Search */}
          <div className="search-container">
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search trainees or companies..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filters - Always visible now */}
          <div className="filters-panel">
            <div className="filter-item">
              <input
                type="checkbox"
                id="show-eliminated"
                checked={showEliminated}
                onChange={(e) => onShowEliminatedChange(e.target.checked)}
              />
              <label htmlFor="show-eliminated">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
                Show Eliminated Trainees
              </label>
            </div>

            <div className="filter-item">
              <input
                type="checkbox"
                id="show-top8"
                checked={showTop8}
                onChange={(e) => onShowTop8Change(e.target.checked)}
              />
              <label htmlFor="show-top8">
                {/* Mudança do ícone de troféu para coroa */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11.562 3.266a.5.5 0 0 1 .876 0L14.5 8.5l5.5 1.5-4 4 1 5.5-5-2.5-5 2.5 1-5.5-4-4 5.5-1.5z" />
                </svg>
                Highlight Current Top 8
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Trainees Grid */}
      <div className="trainees-grid custom-scrollbar">
        {trainees.map((trainee) => (
          <TraineeCard key={trainee.id} trainee={trainee} showTop8={showTop8} onClick={() => onTraineeClick(trainee)} />
        ))}
      </div>
    </div>
  )
}
