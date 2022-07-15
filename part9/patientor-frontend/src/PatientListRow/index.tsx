import HealthCheckRow from "./HealthCheckRow";
import HospitalRow from "./HospitalRow";
import OccupationalRow from "./OccupationalRow";
import { Diagnose, Entry } from "../types";


const PatientListRow = ({ entry, key, diagnoseList }: { entry: Entry, key: number, diagnoseList: Diagnose[] | undefined }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalRow entry={entry} key={key} diagnoseList={diagnoseList} />;
    case "HealthCheck":
      return <HealthCheckRow entry={entry} key={key} diagnoseList={diagnoseList} />;
    case "OccupationalHealthcare":
      return <OccupationalRow entry={entry} key={key} diagnoseList={diagnoseList} />;
  }
};

export default PatientListRow;