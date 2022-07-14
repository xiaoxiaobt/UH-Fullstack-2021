import { HealthCheckEntry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckRow = ({ entry, key }: { entry: HealthCheckEntry, key: number }) => {

  return (
    <li style={{ borderRadius: "5px", border: "1px solid black" }} key={key}>
      <span>
        {entry.date}
        <MedicalServicesIcon />
      </span>
      <p><em>{entry.description}</em></p>
      <FavoriteIcon color={entry.healthCheckRating === 0 ? 'success' : 'warning'} />
      <p>diagnose by {entry.specialist}</p>
    </li>
  );
};

export default HealthCheckRow;