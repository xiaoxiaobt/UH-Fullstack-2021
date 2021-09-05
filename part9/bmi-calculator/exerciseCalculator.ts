type RatingDescription = 'need improvements' | 'not too bad but could be better' | 'excellent'
const ratingDescriptions: Array<RatingDescription> = ['need improvements', 'not too bad but could be better', 'excellent']
type Rating = 1 | 2 | 3

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: Rating
  ratingDescription: RatingDescription
  target: number
  average: number
}

const calculateExercises = (args: Array<number>, target: number): Result => {
  if (args.some(x => x < 0) || target < 0) {
    throw new Error('Negative numbers are not allowed')
  }
  const periodLength: number = args.length
  const trainingDays: number = args.filter(x => x > 0).length
  const average: number = args.reduce((a, b) => a + b) / periodLength
  const success: boolean = average >= target
  const rating: Rating = average >= target ? 3 : (average >= target * 0.5 ? 2 : 1)
  const ratingDescription: RatingDescription = ratingDescriptions[rating - 1]
  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))