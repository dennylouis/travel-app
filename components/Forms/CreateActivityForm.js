import { Formik, Form } from "formik";
import Input from "../Input/Input";
// import styles from "./CreateActivityForm.module.scss";

export default function CreateActivityForm() {
  async function handleSubmit(values) {
    const response = await fetch("/api/activities/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    });
  }

  const handleValidation = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Required";

    return errors;
  };

  return (
    <div>
      <h1>New Activity</h1>
      <Formik
        initialValues={{ name: "", notes: "", startDate: "", endDate: "" }}
        onSubmit={handleSubmit}
        validate={handleValidation}
      >
        {(props) => {
          return (
            <Form>
              <Input name="name" type="text" label="Name" placeholder="Activity name" />
              <Input name="notes" type="text" label="Notes" placeholder="Notes" />
              <Input name="startDate" type="date" label="Start Date" placeholder="Notes" />
              <Input name="endDate" type="date" label="End Date" placeholder="Notes" />

              <button type="submit" disabled={!props.isValid}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}