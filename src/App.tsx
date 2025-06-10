"use client"

import { useState, useEffect } from "react"
import { Header } from "./components/Header"
import { TraineeList } from "./components/TraineeList"
import { RankingConstellation } from "./components/RankingConstellation"
import { trainees as initialTrainees } from "./data/trainees"
import type { Trainee } from "./types/trainee"
import "./App.css"

function App() {
  const [trainees, setTrainees] = useState<Trainee[]>(initialTrainees)
  const [ranking, setRanking] = useState<(Trainee | null)[]>(Array(8).fill(null))
  const [searchQuery, setSearchQuery] = useState("")
  const [showEliminated, setShowEliminated] = useState(false)
  const [showTop8, setShowTop8] = useState(false)

  // Load ranking from URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const rankingParam = urlParams.get("r")
    if (rankingParam) {
      try {
        const decodedRanking = atob(rankingParam)
        const rankingIds: number[] = []

        for (let i = 0; i < decodedRanking.length; i += 2) {
          const traineeId = Number.parseInt(decodedRanking.substr(i, 2))
          rankingIds.push(traineeId)
        }

        const newRanking = rankingIds.map((id) => {
          if (id < 0) return null
          return trainees.find((t) => t.id === id) || null
        })

        setRanking(newRanking.slice(0, 8))

        // Update selected status
        setTrainees((prev) =>
          prev.map((trainee) => ({
            ...trainee,
            selected: newRanking.some((r) => r?.id === trainee.id),
          })),
        )
      } catch (error) {
        console.error("Failed to parse ranking from URL:", error)
      }
    }
  }, [trainees])

  const filteredTrainees = trainees.filter((trainee) => {
    const matchesSearch =
      trainee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainee.company.toLowerCase().includes(searchQuery.toLowerCase())

    if (!showEliminated && trainee.eliminated) return false

    return matchesSearch
  })

  const toggleTraineeSelection = (trainee: Trainee) => {
    if (trainee.selected) {
      // Remove from ranking
      const newRanking = ranking.map((r) => (r?.id === trainee.id ? null : r))
      setRanking(newRanking)

      setTrainees((prev) => prev.map((t) => (t.id === trainee.id ? { ...t, selected: false } : t)))
    } else {
      // Add to ranking
      const firstEmptyIndex = ranking.findIndex((r) => r === null)
      if (firstEmptyIndex !== -1) {
        const newRanking = [...ranking]
        newRanking[firstEmptyIndex] = trainee
        setRanking(newRanking)

        setTrainees((prev) => prev.map((t) => (t.id === trainee.id ? { ...t, selected: true } : t)))
      }
    }
  }

  const removeFromRanking = (trainee: Trainee) => {
    const newRanking = ranking.map((r) => (r?.id === trainee.id ? null : r))
    setRanking(newRanking)

    setTrainees((prev) => prev.map((t) => (t.id === trainee.id ? { ...t, selected: false } : t)))
  }

  const swapRankingPositions = (fromIndex: number, toIndex: number) => {
    const newRanking = [...ranking]
    const temp = newRanking[fromIndex]
    newRanking[fromIndex] = newRanking[toIndex]
    newRanking[toIndex] = temp
    setRanking(newRanking)
  }

  return (
    <div className="app">
      <Header />

      <div className="container">
        <div className="main-grid">
          <div className="left-section">
            <TraineeList
              trainees={filteredTrainees}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              showEliminated={showEliminated}
              onShowEliminatedChange={setShowEliminated}
              showTop8={showTop8}
              onShowTop8Change={setShowTop8}
              onTraineeClick={toggleTraineeSelection}
            />
          </div>

          <div className="right-section">
            <RankingConstellation
              ranking={ranking}
              onRemoveTrainee={removeFromRanking}
              onSwapPositions={swapRankingPositions}
              showEliminated={showEliminated}
              showTop8={showTop8}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
