import { Diagnose, Gender, NewPatient, NewHealthCheckEntry, HealthCheckRating, NewOccupationalHealthcareEntry, NewHospitalEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || ssn.length !== 11) {
    throw new Error('Incorrect or missing SSN: ' + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

type PatientFields = {
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: PatientFields): NewPatient => {

  const newEntry: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };

  return newEntry;
};

type HealthCheckEntryFields = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
  healthCheckRating: HealthCheckRating;
};

const toNewHealthCheckEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating
}: HealthCheckEntryFields): NewHealthCheckEntry => {

  const newEntry: NewHealthCheckEntry = {
    description,
    date,
    specialist,
    diagnosisCodes,
    healthCheckRating,
    type: "HealthCheck"
  };

  return newEntry;
};

type OccupationalHealthcareEntryFields = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
  employerName: string,
  sickLeave?: {
    startDate: string,
    endDate: string
  }
};

const toNewOccupationalHealthcareEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  employerName,
  sickLeave
}: OccupationalHealthcareEntryFields): NewOccupationalHealthcareEntry => {

  const newEntry: NewOccupationalHealthcareEntry = {
    description,
    date,
    specialist,
    diagnosisCodes,
    employerName,
    sickLeave,
    type: "OccupationalHealthcare"
  };

  return newEntry;
};

type HospitalEntryFields = {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
  discharge: {
    date: string;
    criteria: string;
  }
};

const toNewHospitalEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge
}: HospitalEntryFields): NewHospitalEntry => {

  const newEntry: NewHospitalEntry = {
    description,
    date,
    specialist,
    diagnosisCodes,
    discharge,
    type: "Hospital"
  };

  return newEntry;
};




export { toNewPatient, toNewHealthCheckEntry, toNewOccupationalHealthcareEntry, toNewHospitalEntry };