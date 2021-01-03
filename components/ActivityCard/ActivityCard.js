import { formatRange } from "../../lib/dateHelpers";
import styles from "./ActivityCard.module.scss";

export default function ActivityCard({ activity }) {
  const { name, image, start_date, end_date, location } = activity;
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} />
      <div>
        <p>{name}</p>
        <span>{formatRange(start_date, end_date)}</span>
      </div>
    </div>
  );
}
