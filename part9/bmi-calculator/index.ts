import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = String(req.query.height);
  const weight = String(req.query.weight);
  try {
    const bmi = calculateBmi([height, weight])
    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi
    });
  }
  catch (e) {
    res.send({
      error: "malformatted parameters"
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});