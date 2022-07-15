import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { Patient, Entry } from '../types';
import PatientListRow from "../PatientListRow";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { useStateValue, addEntry } from "../state";

const PatientPage = () => {
  const [{ diagnoses }, dispatch] = useStateValue();
  const [currentPatient, setCurrentPatient] = React.useState<Patient | undefined>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const { id } = useParams<{ id: string }>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id as string));
      currentPatient?.entries.push(newEntry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
    <div>
      <h1>{currentPatient?.name} {currentPatient?.gender === 'male' ? '♂' : currentPatient?.gender === 'female' ? '♀' : '⚥'}</h1>
      <p>ssn: {currentPatient?.ssn}</p>
      <p>occupation: {currentPatient?.occupation}</p>
      <h3>entries</h3>
      {currentPatient?.entries?.map((e, index) => <PatientListRow entry={e} key={index} diagnoses={diagnoses} />)}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
