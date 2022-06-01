import patientsData from '../../data/patients.json';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) =>
      ({ id, name, dateOfBirth, gender, occupation }) as NonSensitivePatient
  );
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient };