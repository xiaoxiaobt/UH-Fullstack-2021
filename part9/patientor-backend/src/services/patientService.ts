import patientsData from '../../data/patients';
import { Entry, NewHealthCheckEntry, NewHospitalEntry, NewOccupationalHealthcareEntry, NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Array<Patient> = patientsData;

const getPatients = (): Array<NonSensitivePatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) =>
      ({ id, name, dateOfBirth, gender, occupation, entries }) as NonSensitivePatient
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

const addEntry = (patientId: string, entry: NewHealthCheckEntry | NewOccupationalHealthcareEntry | NewHospitalEntry): Entry => {
  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };
  const patient: Patient = patients.find(p => p.id === patientId) as Patient;
  patient.entries.push(newEntry);
  return newEntry;
};

export default { getPatients, addPatient, getPatientByID, addEntry };