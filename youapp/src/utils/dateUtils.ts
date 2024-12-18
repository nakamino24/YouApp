// Function to calculate Horoscope based on "YYYY-MM-DD"
export function calculateHoroscope(date: string): string {
  const [, month, day] = date.split("-").map(Number);

  const horoscopeSigns = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ];

  if (!month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
    console.error("Invalid birthday format:", date);
    return "Invalid Date";
  }

  for (const sign of horoscopeSigns) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;

    if (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay)
    ) {
      return sign.sign;
    }
  }

  return "Capricorn";
}

export function calculateZodiac(year: number): string {
  const zodiacSigns = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig",
  ];

  if (!year || year < 0) {
    console.error("Invalid year:", year);
    return "Invalid Year";
  }

  const index = (year - 4) % 12; // Offset by 4 because Rat starts in year 4
  return zodiacSigns[index];
}
