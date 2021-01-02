import styles from "./ActivityCard.module.scss";

export default function ActivityCard({ activity }) {
  const { title, image, date, location } = activity;
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} />
      <div>
        <h3>{title}</h3>
        {location && (
          <p>
            {location.properties.name} • {location.properties.address}
          </p>
        )}
      </div>
    </div>
  );
}
