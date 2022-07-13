import patientsData from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) =>
      ({ id, name, dateOfBirth, gender, occupation }) as NonSensitivePatient
  );
};

const getPatientByID = (id: string): Patient | undefined => {
  return patients.find(x => x.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry: Patient = {
    id: uuid(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient, getPatientByID };