import express from 'express';
import patientService from '../services/patientService';
import { NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, NewPatient } from '../types';
import { toNewPatient, toNewHealthCheckEntry, toNewOccupationalHealthcareEntry, toNewHospitalEntry } from '../utils';

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

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  const body = req.body;
  try {
    switch (body?.type) {
      case 'HealthCheck':
        const newEntry: NewHealthCheckEntry = toNewHealthCheckEntry(req.body);
        const addedEntry: Entry = patientService.addEntry(patientId, newEntry);
        res.json(addedEntry);
        break;
      case 'OccupationalHealthcare':
        const newEntry: NewOccupationalHealthcareEntry = toNewOccupationalHealthcareEntry(req.body);
        const addedEntry: Entry = patientService.addEntry(patientId, newEntry);
        res.json(addedEntry);
        break;
      case 'Hospital':
        const newEntry: NewHospitalEntry = toNewHospitalEntry(req.body);
        const addedEntry: Entry = patientService.addEntry(patientId, newEntry);
        res.json(addedEntry);
        break;
      default:
        throw Error;
    }
  } catch (e) {
    const err = e as Error;
    res.status(400).send(err.message);
  }
});

export default router;