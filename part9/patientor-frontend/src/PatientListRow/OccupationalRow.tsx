import { OccupationalHealthcareEntry } from "../types";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalRow = ({ entry, key }: { entry: OccupationalHealthcareEntry, key: number }) => {

  return (
    <li style={{ borderRadius: "5px", border: "1px solid black" }} key={key}>
      <span>
        {entry.date}
        <WorkIcon />
        {entry.employerName}
      </span>
      <p><em>{entry.description}</em></p>
      <p>diagnose by {entry.specialist}</p>
    </li>
  );
};

export default OccupationalRow;