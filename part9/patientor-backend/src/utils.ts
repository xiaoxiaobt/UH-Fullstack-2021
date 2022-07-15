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

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name: ' + employerName);
  }
  return employerName;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (healthCheckRating === undefined || healthCheckRating === null || (typeof healthCheckRating !== 'number') || !Number.isInteger(healthCheckRating) || healthCheckRating < 0) {
    throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): undefined | { startDate: string, endDate: string } => {
  if (sickLeave === undefined) {
    return sickLeave;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const k: any = sickLeave;
    if (typeof k === 'object' && k !== null &&
      'startDate' in k && 'endDate' in k &&
      isString(k.startDate) &&
      isString(k.endDate) &&
      isDate(k.startDate as string) &&
      isDate(k.endDate as string)) {
      return {
        startDate: k.startDate as string,
        endDate: k.endDate as string
      };
    } else {
      throw new Error('Incorrect sick leave.');
    }
  }
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): undefined | Array<Diagnose['code']> => {
  if (diagnosisCodes === undefined) {
    return diagnosisCodes;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const k: any = diagnosisCodes;
    if (Array.isArray(k) && k.every(item => item instanceof String || typeof item === 'string')) {
      return k as Array<string>;
    } else {
      throw new Error('Incorrect diagnosis codes.');
    }
  }
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const k: any = discharge;
  if (typeof k === 'object' && k !== null &&
    'date' in k && 'criteria' in k &&
    isString(k.date) &&
    isString(k.criteria) &&
    isDate(k.date as string)) {
    return {
      date: k.date as string,
      criteria: k.criteria as string
    };
  } else {
    throw new Error('Incorrect discharge.');
  }
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
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
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
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    employerName: parseEmployerName(employerName),
    sickLeave: parseSickLeave(sickLeave),
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
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    discharge: parseDischarge(discharge),
    type: "Hospital"
  };

  return newEntry;
};


export { toNewPatient, toNewHealthCheckEntry, toNewOccupationalHealthcareEntry, toNewHospitalEntry };