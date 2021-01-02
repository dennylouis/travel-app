import ActivityCard from "../ActivityCard/ActivityCard";
import { DateTime } from "luxon";
import styles from "./TripCard.module.scss";

export default function TripCard({ trip }) {
  const { name, start_date, end_date, description, activities } = trip;
  return (
    <div className={styles.container}>
      <h3>{name}</h3>
      <p style={{ margin: "0 0 1rem 0" }}>
        {DateTime.fromISO(start_date).toFormat("d LLLL yyyy")} –{" "}
        {DateTime.fromISO(end_date).toFormat("d LLLL yyyy")}
        <br />
        {DateTime.fromISO(start_date).toRelative()}
      </p>
      <span>{description}</span>
      <div>{activities && activities.map((activity) => <ActivityCard activity={activity} />)}</div>
    </div>
  );
}
