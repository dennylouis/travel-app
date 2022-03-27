import { formatRange } from "lib/dateHelpers";
import styles from "./ActivityCard.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

export default function ActivityCard({ activity, trip_id, isDragging, setActiveActivity }) {
  const { name, image, start_date, end_date, location_description, type, _id } = activity;
  console.log(activity);

  async function deleteActivity() {
    await fetch("/api/activities/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trip_id, activity_id: _id }),
    });
  }

  // console.log("is dragging", isDragging);

  return (
    <div
      className={cx("container", { dragging: isDragging })}
      onClick={() => setActiveActivity(activity)}
    >
      <div className={styles.details}>
        <p className={styles.title}>{name}</p>
        {location && <p className="caption">{location_description}</p>}
        {start_date && <p className="caption">{formatRange(start_date, end_date)}</p>}
        {type && <p>{type}</p>}
      </div>

      <figure className={styles.imageContainer}>{image && <img src={image} />}</figure>

      {/* <button className={styles.delete} onClick={() => setActiveActivity(activity)}>
        View
      </button> */}
      {/* {_id && (
        <button className={styles.delete} onClick={deleteActivity}>
          Delete
        </button>
      )} */}
    </div>
  );
}
