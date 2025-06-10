import type React from "react"

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header-background"></div>
      <div className="header-content">
        <div className="header-title-container">
          <div className="header-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              <polygon points="12,8 18,12 12,16 6,12" />
            </svg>
          </div>
          <h1 className="header-title">BOYS II PLANET</h1>
          <div className="header-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
              <polygon points="12,8 18,12 12,16 6,12" />
            </svg>
          </div>
        </div>

        <div className="header-subtitle-container">
          <p className="header-subtitle">Create Your Ultimate Top 8 Lineup</p>
          <p className="header-description">Select and rank your favorite trainees to build the perfect group</p>

          <div className="header-badge">
            <p>BOYS! COME TO THE PLANET!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
