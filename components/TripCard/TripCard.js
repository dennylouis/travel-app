import Link from "next/link";
import { DateTime } from "luxon";
import { formatRange } from "../../lib/dateHelpers";
import styles from "./TripCard.module.scss";

export default function TripCard({ trip }) {
  const { name, start_date, end_date, description, _id } = trip;
  return (
    <Link href={`/trips/${_id}`}>
      <a className={styles.container}>
        <h3>{name}</h3>
        <p style={{ margin: "0 0 1rem 0" }}>
          {start_date && end_date ? (
            <>
              {formatRange(start_date, end_date)} • {DateTime.fromISO(start_date).toRelative()}
            </>
          ) : (
            "no dates set"
          )}
        </p>
        <span>{description}</span>
      </a>
    </Link>
  );
}
