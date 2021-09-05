const calculateBmi = (height: number, weight: number): String => {
  if (height < 0 || weight < 0) return "Negative values are not allowed"
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
    "Obese (Class I)"
  else if (bmi < 40)
    "Obese (Class II)"
  else
    "Obese (Class III)"
}

console.log(calculateBmi(180, 74))