import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Diagnose, Patient } from '../types';
import PatientListRow from "../PatientListRow";

const PatientPage = () => {

  const [currentPatient, setCurrentPatient] = React.useState<Patient | undefined>();
  const [diagnoseList, setDiagnoseList] = React.useState<Diagnose[] | undefined>();

  const { id } = useParams<{ id: string }>();
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id as string}`
        );
        setCurrentPatient(patientFromApi);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoseList = async () => {
      try {
        const { data: diagnoseListFromApi } = await axios.get<Diagnose[]>(
          `${apiBaseUrl}/diagnoses/`
        );
        setDiagnoseList(diagnoseListFromApi);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
    void fetchDiagnoseList();
  }, []);

  return (
    <div className="App">
      <h1>{currentPatient?.name} {currentPatient?.gender === 'male' ? '♂' : currentPatient?.gender === 'female' ? '♀' : '⚥'}</h1>
      <p>ssn: {currentPatient?.ssn}</p>
      <p>occupation: {currentPatient?.occupation}</p>
      <h3>entries</h3>
      {currentPatient?.entries.map((e, index) => <PatientListRow entry={e} key={index} diagnoseList={diagnoseList} />)}
    </div>
  );
};

export default PatientPage;
