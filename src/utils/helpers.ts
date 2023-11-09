//Interfaces
import { ColorDetails, SavedColor } from '../interfaces/ColorInterfaces'

//Constants
import { colorMap, namedColors } from './constants'

export function isValidColor(colorString: string) {
  // Check if it's a named color
  if (typeof colorString !== 'string') {
    return
  }

  if (namedColors.includes(colorString.toLowerCase())) {
    return true
  }

  // Check if it's a hex color (e.g., #202020)
  const hexColorRegex = /^#?([0-9A-Fa-f]{6})$/
  if (hexColorRegex.test(colorString)) {
    return true
  }

  // Check if it's an RGB color (e.g., rgb(255,255,255))
  const rgbColorRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/
  if (rgbColorRegex.test(colorString)) {
    return true
  }

  // If none of the formats match, it's not a valid color
  return false
}

//Returning a object with name, hex and rgb
export function getColorInfo(colorString: string): ColorDetails {
  // Remove leading and trailing spaces
  colorString = colorString.trim()

  // Check if the color string exists in the map
  if (Object.prototype.hasOwnProperty.call(colorMap, colorString.toLowerCase())) {
    const colorInfo = colorMap[colorString.toLowerCase()]
    return {
      name: colorString,
      hex: colorInfo.hex,
      rgb: colorInfo.rgb,
    }
  }

  // Check if it's a hex color (e.g., #202020)
  const hexColorRegex = /^#?([0-9A-Fa-f]{6})$/
  if (hexColorRegex.test(colorString)) {
    const hexValue = colorString.replace('#', '') // Remove optional '#'
    const r = parseInt(hexValue.slice(0, 2), 16)
    const g = parseInt(hexValue.slice(2, 4), 16)
    const b = parseInt(hexValue.slice(4, 6), 16)
    return {
      name: '', // Hex colors don't have named values
      hex: colorString,
      rgb: `rgb(${r},${g},${b})`,
    }
  }

  // Check if it's an RGB color (e.g., rgb(255,255,255))
  const rgbColorRegex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/
  const rgbMatch = colorString.match(rgbColorRegex)
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10)
    const g = parseInt(rgbMatch[2], 10)
    const b = parseInt(rgbMatch[3], 10)
    const hexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
    return {
      name: '', // RGB colors don't have named values
      hex: hexColor,
      rgb: `rgb(${r},${g},${b})`,
    }
  }

  // If none of the formats match, return an empty color object
  return {
    name: '',
    hex: '',
    rgb: '',
  }
}

export const createColorObject = (color: string): SavedColor => {
  const colorObject: SavedColor = {
    colorDetails: getColorInfo(color),
    created: new Date(),
    category: [],
  }

  return colorObject
}
