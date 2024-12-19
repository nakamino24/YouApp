import React from 'react'

interface HoroscopeIconProps {
  horoscope: string
  size?: number
}

export default function HoroscopeIcon({
  horoscope,
  size = 24,
}: HoroscopeIconProps) {
  const icons: Record<string, string> = {
    Aries: '♈',
    Taurus: '♉',
    Gemini: '♊',
    Cancer: '♋',
    Leo: '♌',
    Virgo: '♍',
    Libra: '♎',
    Scorpio: '♏',
    Sagittarius: '♐',
    Capricorn: '♑',
    Aquarius: '♒',
    Pisces: '♓',
  }

  return (
    <span style={{ fontSize: size }} title={horoscope}>
      {icons[horoscope] || '❓'}
    </span>
  )
}
