import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Patient } from '../types';

const PatientPage = () => {

  const [currentPatient, setCurrentPatient] = React.useState<Patient | undefined>();

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
    void fetchPatient();
  }, []);

  return (
    <div className="App">
      <h1>{currentPatient?.name} {currentPatient?.gender === 'male' ? '♂' : currentPatient?.gender === 'female' ? '♀' : '⚥'}</h1>
      <p>ssn: {currentPatient?.ssn}</p>
      <p>occupation: {currentPatient?.occupation}</p>
    </div>
  );
};

export default PatientPage;
