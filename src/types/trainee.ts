export interface Trainee {
  id: number
  name: string
  nameKorean: string
  company: string
  grade: "A" | "B" | "C" | "D" | "F" | "?"
  birthYear: number
  image: string
  selected: boolean
  eliminated: boolean
  top12: boolean
}
