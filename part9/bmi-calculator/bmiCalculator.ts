const calculateBmi = (args: Array<String>): String => {
  if (args.length < 2) throw new Error('Not enough arguments')
  if (args.length > 2) throw new Error('Too many arguments')
  const [height, weight] = args.map(Number);

  if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');
  else if (height <= 0 || weight <= 0) throw new Error("Non-positive values are not allowed")

  const bmi: number = 10000 * weight / (height * height)
  if (bmi < 16)
    return "Underweight (Severe thinness)"
  else if (bmi < 17)
    return "Underweight (Moderate thinness)"
  else if (bmi < 18.5)
    return "Underweight (Mild thinness)"
  else if (bmi < 25)
    return "Normal range"
  else if (bmi < 30)
    return "Overweight (Pre-obese)"
  else if (bmi < 35)
    return "Obese (Class I)"
  else if (bmi < 40)
    return "Obese (Class II)"
  else
    return "Obese (Class III)"
}

// console.log(calculateBmi(process.argv))

export default calculateBmi