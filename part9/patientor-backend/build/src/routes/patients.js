"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientService_1.default.getPatients());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.json(patientService_1.default.getPatientByID(id));
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatient);
        res.json(addedEntry);
    }
    catch (e) {
        const err = e;
        res.status(400).send(err.message);
    }
});
router.post('/:id/entries', (req, res) => {
    const patientId = req.params.id;
    try {
        switch (req?.body?.type) {
            case 'HealthCheck':
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const newHealthEntry = (0, utils_1.toNewHealthCheckEntry)(req.body);
                const addedHealthEntry = patientService_1.default.addEntry(patientId, newHealthEntry);
                res.json(addedHealthEntry);
                break;
            case 'OccupationalHealthcare':
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const newOccupationalEntry = (0, utils_1.toNewOccupationalHealthcareEntry)(req.body);
                const addedOccupationalEntry = patientService_1.default.addEntry(patientId, newOccupationalEntry);
                res.json(addedOccupationalEntry);
                break;
            case 'Hospital':
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                const newHospitalEntry = (0, utils_1.toNewHospitalEntry)(req.body);
                const addedHospitalEntry = patientService_1.default.addEntry(patientId, newHospitalEntry);
                res.json(addedHospitalEntry);
                break;
            default:
                throw Error;
        }
    }
    catch (e) {
        const err = e;
        res.status(400).send(err.message);
    }
});
exports.default = router;
