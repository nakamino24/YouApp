import React from 'react'

interface ZodiacIconProps {
  zodiac: string
  size?: number
}

export default function ZodiacIcon({ zodiac, size = 24 }: ZodiacIconProps) {
  const icons: Record<string, string> = {
    Rat: '🐀',
    Ox: '🐂',
    Tiger: '🐅',
    Rabbit: '🐇',
    Dragon: '🐉',
    Snake: '🐍',
    Horse: '🐎',
    Goat: '🐐',
    Monkey: '🐒',
    Rooster: '🐓',
    Dog: '🐕',
    Pig: '🐖',
  }

  return (
    <span style={{ fontSize: size }} title={zodiac}>
      {icons[zodiac] || '❓'}
    </span>
  )
}
