import TripCard from "components/TripCard/TripCard";
import styles from "./TripRow.module.scss";

export default function TripRow({ title, trips }) {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.row}>
        {trips.map((trip) => {
          return (
            <div className={styles.cardWrapper}>
              <TripCard key={trip._id} trip={trip} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
