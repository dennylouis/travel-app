import { Field } from "formik";
import styles from "./Input.module.scss";

export default function Input({ name, type, label, placeholder }) {
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <Field name={name} type={type} placeholder={placeholder} />
    </div>
  );
}
