import Link from "next/link";
import { DateTime } from "luxon";
import { isAfterToday, isBeforeToday } from "../../lib/dateHelpers";
import Avatar from "../Avatar/Avatar";
import styles from "./TripCard.module.scss";

export default function TripCard({ trip, completed }) {
  const { name, start_date, end_date, _id } = trip;

  const relativeDate = () => {
    const isUpcoming = isAfterToday(start_date);
    const isCompleted = isBeforeToday(end_date);

    if (isUpcoming) {
      return `Starts ${DateTime.fromISO(start_date).toRelative()}`;
    } else if (isCompleted) {
      return DateTime.fromISO(end_date).toRelative();
    } else {
      return `Ends ${DateTime.fromISO(end_date).toRelative()}`;
    }
  };

  return (
    <Link href={`/trips/${_id}`}>
      <a className={styles.container}>
        <div className={styles.icon} />
        <div className={styles.avatar}>
          <Avatar user={{ firstName: "Denny" }} />
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          {start_date && <span className={styles.date}>{relativeDate()}</span>}
        </div>

        <span className={styles.cta}>View trip</span>
      </a>
    </Link>
  );
}
