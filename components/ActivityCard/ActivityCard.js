import { formatRange } from "lib/dateHelpers";
import styles from "./ActivityCard.module.scss";

export default function ActivityCard({ activity, trip_id }) {
  const { name, image, start_date, end_date, location, type, _id } = activity;

  async function deleteActivity() {
    await fetch("/api/activities/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trip_id, activity_id: _id }),
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <p className={styles.title}>{name}</p>
        {location && <p className={styles.caption}>{location.name}</p>}
        {start_date && <p className={styles.caption}>{formatRange(start_date, end_date)}</p>}
        {type && <p>{type}</p>}
      </div>

      <img className={styles.image} src={image} />
      {_id && (
        <button className={styles.delete} onClick={deleteActivity}>
          Delete
        </button>
      )}
    </div>
  );
}
