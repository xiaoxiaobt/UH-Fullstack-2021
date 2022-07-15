import HealthCheckRow from "./HealthCheckRow";
import HospitalRow from "./HospitalRow";
import OccupationalRow from "./OccupationalRow";
import { Diagnose, Entry } from "../types";


const PatientListRow = ({ entry, key, diagnoses }: { entry: Entry, key: number, diagnoses: Diagnose[] }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalRow entry={entry} key={key} diagnoseList={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckRow entry={entry} key={key} diagnoseList={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalRow entry={entry} key={key} diagnoseList={diagnoses} />;
  }
};

export default PatientListRow;