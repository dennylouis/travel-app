import { Formik, Form } from "formik";
import Input from "../Input/Input";

export default function CreateTripForm() {
  async function handleSubmit(values) {
    const response = await fetch("/api/trips/create", {
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
      <h1>New Trip</h1>
      <Formik
        initialValues={{ name: "", description: "", startDate: "", endDate: "" }}
        onSubmit={handleSubmit}
        validate={handleValidation}
      >
        {(props) => {
          return (
            <Form>
              <Input name="name" type="text" label="Name" placeholder="Trip name" />
              <Input name="description" type="text" label="Description" placeholder="Description" />
              <Input name="startDate" type="date" label="Start Date" placeholder="Start Date" />
              <Input name="endDate" type="date" label="End Date" placeholder="End Date" />

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
