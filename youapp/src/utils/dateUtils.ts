export function getHoroscope(day: number, month: number): string {
  const horoscopes: [string, number][] = [
    ["Capricorn", 19], ["Aquarius", 18], ["Pisces", 20], ["Aries", 19],
    ["Taurus", 20], ["Gemini", 20], ["Cancer", 22], ["Leo", 22],
    ["Virgo", 22], ["Libra", 22], ["Scorpio", 21], ["Sagittarius", 21], ["Capricorn", 31]
  ];

  const limit = horoscopes[month][1];
  return day > limit ? horoscopes[month + 1][0] : horoscopes[month][0];
}

export function getZodiac(year: number): string {
  const zodiacs = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", 
                   "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  return zodiacs[year % 12];
}
