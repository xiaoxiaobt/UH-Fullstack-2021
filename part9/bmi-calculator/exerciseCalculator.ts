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

const calculateExercises = (args: Array<string>): Result => {
  const arguments = args.map(Number).slice(2)
  if (arguments.length <= 1) {
    throw new Error('Not enough arguments')
  } else if (arguments.some(n => isNaN(n))) {
    throw new Error('All values should be numbers')
  } else if (arguments.some(n => n < 0)) {
    throw new Error('Negative numbers are not allowed')
  }

  const record = arguments.slice(1)
  const target = arguments[0]
  const periodLength: number = record.length
  const trainingDays: number = record.filter(x => x > 0).length
  const average: number = record.reduce((a, b) => a + b) / periodLength
  const success: boolean = average >= target
  const rating: Rating = average >= target ? 3 : (average >= target * 0.5 ? 2 : 1)
  const ratingDescription: RatingDescription = ratingDescriptions[rating - 1]
  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  }
}

console.log(calculateExercises(process.argv))