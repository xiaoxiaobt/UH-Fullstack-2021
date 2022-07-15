import { Diagnose, HealthCheckEntry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckRow = ({ entry, key, diagnoseList }: { entry: HealthCheckEntry, key: number, diagnoseList: Diagnose[] | undefined }) => {

  return (
    <li style={{ borderRadius: "5px", border: "1px solid black" }} key={key}>
      <span>
        {entry.date}
        <MedicalServicesIcon />
      </span>
      <p><em>{entry.description}</em></p>
      <ul>
        {entry?.diagnosisCodes?.map(x => <li key={x}>{x} {diagnoseList?.find(y => y.code === x)?.name}</li>)}
      </ul>
      <FavoriteIcon color={entry.healthCheckRating === 0 ? 'success' : 'warning'} />
      <p>diagnose by {entry.specialist}</p>
    </li>
  );
};

export default HealthCheckRow;