import express from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json(patientService.getPatientByID(id));
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (e) {
    const err = e as Error;
    res.status(400).send(err.message);
  }
});

export default router;