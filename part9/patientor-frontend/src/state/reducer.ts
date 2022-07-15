import { State } from "./state";
import { Entry, Patient, Diagnose } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "SET_DIAGNOSE_LIST";
    payload: Diagnose[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "ADD_ENTRY";
    payload: { entry: Entry, patientId: string };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: action.payload
      };
    case "ADD_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.patientId]: {
            ...state.patients[action.payload.patientId], entries: [...state.patients[action.payload.patientId].entries, action.payload.entry]
          }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientList: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientList };
};

export const setDiagnosesList = (diagnoseList: Diagnose[]): Action => {
  return { type: "SET_DIAGNOSE_LIST", payload: diagnoseList };
};

export const addPatient = (patient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: patient };
};

export const addEntry = (entry: Entry, patientId: string): Action => {
  return { type: "ADD_ENTRY", payload: { entry: entry, patientId: patientId } };
};