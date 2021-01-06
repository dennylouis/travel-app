import styles from "./Avatar.module.scss";

export default function Avatar({ user }) {
  const { firstName } = user;

  return (
    <div className={styles.container}>
      <span className={styles.initial}>{firstName.charAt(0)}</span>
    </div>
  );
}
