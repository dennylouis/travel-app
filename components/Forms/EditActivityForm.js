import { Formik, Form } from "formik";
import { formatISO } from "lib/dateHelpers";
import Input from "components/Input/Input";
import AddressInput from "components/AddressInput/AddressInput";
import ImageUpload from "components/ImageUpload/ImageUpload";

export default function EditActivityForm({ activity, trip_id }) {
  async function handleSubmit(values) {
    const response = await fetch("/api/activities/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, trip_id, activity_id: activity._id }),
    });
  }

  async function deleteActivity() {
    await fetch("/api/activities/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ trip_id, activity_id: activity._id }),
    });
  }

  const handleValidation = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Required";

    return errors;
  };

  return (
    <div>
      <h1>{activity.name}</h1>
      <Formik
        initialValues={{
          name: activity.name,
          notes: activity.notes,
          address: activity.address,
          startDate: formatISO(activity.start_date),
          endDate: formatISO(activity.end_date),
          image: activity.image,
        }}
        onSubmit={handleSubmit}
        validate={handleValidation}
      >
        {(props) => {
          console.log(activity, props.values);
          return (
            <Form>
              {/* {props.values.image && (
                <img
                  style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }}
                  src={props.values.image}
                /> */}
              <ImageUpload
                label="Image"
                name="image"
                value={props.values.image}
                onChange={props.handleChange}
                error={props.errors.image}
              />
              {/* )} */}
              <Input name="name" type="text" label="Name" placeholder="Activity name" />
              <AddressInput
                value={props.values.address}
                onChange={props.handleChange}
                name="address"
                type="text"
                label="Address"
                placeholder="Address"
              />
              <Input name="notes" type="text" label="Notes" placeholder="Notes" />
              <Input name="startDate" type="date" label="Start Date" placeholder="Notes" />
              <Input name="endDate" type="date" label="End Date" placeholder="Notes" />

              <button type="submit" disabled={!props.isValid}>
                Submit
              </button>
              <button type="button" onClick={deleteActivity} style={{ color: "red" }}>
                Delete
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
