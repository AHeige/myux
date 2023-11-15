export interface SavedColor {
  name: string
  colorDetails: ColorDetails
  created: Date
  category: Category[]
}

interface Category {
  name: string
}

export interface ColorDetails {
  name: string
  hex: string
  rgb: string
}
