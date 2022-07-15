"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewHospitalEntry = exports.toNewOccupationalHealthcareEntry = exports.toNewHealthCheckEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }
    return name;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn) || ssn.length !== 11) {
        throw new Error('Incorrect or missing SSN: ' + ssn);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing description: ' + description);
    }
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error('Incorrect or missing specialist: ' + specialist);
    }
    return specialist;
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error('Incorrect or missing employer name: ' + employerName);
    }
    return employerName;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || (typeof healthCheckRating !== 'number') || !Number.isInteger(healthCheckRating) || healthCheckRating < 0) {
        throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
    }
    return healthCheckRating;
};
const parseSickLeave = (sickLeave) => {
    if (sickLeave === undefined) {
        return sickLeave;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const k = sickLeave;
        if (typeof k === 'object' && k !== null &&
            'startDate' in k && 'endDate' in k &&
            isString(k.startDate) &&
            isString(k.endDate) &&
            isDate(k.startDate) &&
            isDate(k.endDate)) {
            return {
                startDate: k.startDate,
                endDate: k.endDate
            };
        }
        else {
            throw new Error('Incorrect sick leave.');
        }
    }
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (diagnosisCodes === undefined) {
        return diagnosisCodes;
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const k = diagnosisCodes;
        if (Array.isArray(k) && k.every(item => item instanceof String || typeof item === 'string')) {
            return k;
        }
        else {
            throw new Error('Incorrect diagnosis codes.');
        }
    }
};
const parseDischarge = (discharge) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const k = discharge;
    if (typeof k === 'object' && k !== null &&
        'date' in k && 'criteria' in k &&
        isString(k.date) &&
        isString(k.criteria) &&
        isDate(k.date)) {
        return {
            date: k.date,
            criteria: k.criteria
        };
    }
    else {
        throw new Error('Incorrect discharge.');
    }
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
    return newEntry;
};
exports.toNewPatient = toNewPatient;
const toNewHealthCheckEntry = ({ description, date, specialist, diagnosisCodes, healthCheckRating }) => {
    const newEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
        type: "HealthCheck"
    };
    return newEntry;
};
exports.toNewHealthCheckEntry = toNewHealthCheckEntry;
const toNewOccupationalHealthcareEntry = ({ description, date, specialist, diagnosisCodes, employerName, sickLeave }) => {
    const newEntry = {
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
exports.toNewOccupationalHealthcareEntry = toNewOccupationalHealthcareEntry;
const toNewHospitalEntry = ({ description, date, specialist, diagnosisCodes, discharge }) => {
    const newEntry = {
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        discharge: parseDischarge(discharge),
        type: "Hospital"
    };
    return newEntry;
};
exports.toNewHospitalEntry = toNewHospitalEntry;
