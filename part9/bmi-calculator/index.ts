import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = String(req.query.height);
  const weight = String(req.query.weight);
  try {
    const bmi = calculateBmi([height, weight]);
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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const params = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const target = params.target;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const dailyExercises = params.daily_exercises;

  if (!dailyExercises || !target) {
    res.send({
      error: "parameters missing"
    });
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = calculateExercises([target, ...dailyExercises]);
    res.send(result);
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