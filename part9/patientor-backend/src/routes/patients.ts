import express from 'express';
import patientService from '../services/patientService';
import { Entry, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, NewPatient } from '../types';
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
  try {
    switch (req?.body?.type) {
      case 'HealthCheck':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newHealthEntry: NewHealthCheckEntry = toNewHealthCheckEntry(req.body);
        const addedHealthEntry: Entry = patientService.addEntry(patientId, newHealthEntry);
        res.json(addedHealthEntry);
        break;
      case 'OccupationalHealthcare':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newOccupationalEntry: NewOccupationalHealthcareEntry = toNewOccupationalHealthcareEntry(req.body);
        const addedOccupationalEntry: Entry = patientService.addEntry(patientId, newOccupationalEntry);
        res.json(addedOccupationalEntry);
        break;
      case 'Hospital':
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newHospitalEntry: NewHospitalEntry = toNewHospitalEntry(req.body);
        const addedHospitalEntry: Entry = patientService.addEntry(patientId, newHospitalEntry);
        res.json(addedHospitalEntry);
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