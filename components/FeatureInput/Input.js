import { Field } from "formik";
import styles from "./Input.module.scss";

export default function Input({ name, type, placeholder }) {
  return (
    <div className={styles.container}>
      <Field name={name} type={type} placeholder={placeholder} />
    </div>
  );
}
