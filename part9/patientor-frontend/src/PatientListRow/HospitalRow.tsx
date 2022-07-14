import { Diagnose, HospitalEntry } from "../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalRow = ({ entry, key, diagnoseList }: { entry: HospitalEntry, key: number, diagnoseList: Diagnose[] | undefined }) => {

  return (
    <li style={{ borderRadius: "5px", border: "1px solid black" }} key={key}>
      <span>
        {entry.date}
        <LocalHospitalIcon />
      </span>
      <p><em>{entry.description}</em></p>
      <ul>
        {entry?.diagnosisCodes?.map(x => <li key={x}>{x} {diagnoseList?.find(y => y.code === x)?.name}</li>)}
      </ul>
      <p>diagnose by {entry.specialist}</p>
    </li>
  );
};

export default HospitalRow;