import Link from "next/link";
import { DateTime } from "luxon";
// import { formatRange } from "../../lib/dateHelpers";
import Avatar from "../Avatar/Avatar";
import styles from "./TripCard.module.scss";

export default function TripCard({ trip }) {
  const { name, start_date, _id } = trip;
  return (
    <Link href={`/trips/${_id}`}>
      <a className={styles.container}>
        <div className={styles.icon} />
        <div className={styles.avatar}>
          <Avatar user={{ firstName: "Denny" }} />
        </div>

        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          {start_date && (
            <span className={styles.date}>{DateTime.fromISO(start_date).toRelative()}</span>
          )}
        </div>

        <span className={styles.cta}>View trip</span>
      </a>
    </Link>
  );
}
