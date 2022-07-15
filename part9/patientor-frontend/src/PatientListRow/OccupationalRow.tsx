import { Diagnose, OccupationalHealthcareEntry } from "../types";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalRow = ({ entry, key, diagnoseList }: { entry: OccupationalHealthcareEntry, key: number, diagnoseList: Diagnose[] | undefined }) => {

  return (
    <li style={{ borderRadius: "5px", border: "1px solid black" }} key={key}>
      <span>
        {entry.date}
        <WorkIcon />
        {entry.employerName}
      </span>
      <p><em>{entry.description}</em></p>
      <ul>
        {entry?.diagnosisCodes?.map(x => <li key={x}>{x} {diagnoseList?.find(y => y.code === x)?.name}</li>)}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </li>
  );
};

export default OccupationalRow;