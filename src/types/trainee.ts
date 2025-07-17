export interface Trainee {
  id: number
  name: string
  nameKorean: string
  company: string
  grade: "all star" | "2 star" | "1 star" | "0 star" | "?"
  birthYear: number
  image: string
  selected: boolean
  eliminated: boolean
  top12: boolean
}
