"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const patients = patients_1.default;
const getPatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};
const getPatientByID = (id) => {
    return patients.find(x => x.id === id);
};
const addPatient = (entry) => {
    const newPatientEntry = {
        id: (0, uuid_1.v1)(),
        ...entry
    };
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const addEntry = (patientId, entry) => {
    const newEntry = {
        id: (0, uuid_1.v1)(),
        ...entry
    };
    const patient = patients.find(p => p.id === patientId);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = { getPatients, addPatient, getPatientByID, addEntry };
