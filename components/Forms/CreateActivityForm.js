import { Formik, Form } from "formik";
import Input from "components/Input/Input";
import AddressInput from "components/AddressInput/AddressInput";
import ImageUpload from "components/ImageUpload/ImageUpload";
// import styles from "./CreateActivityForm.module.scss";

export default function CreateActivityForm({ trip_id }) {
  // console.log(trip_id);
  async function handleSubmit(values) {
    const response = await fetch("/api/activities/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, trip_id }),
    });
  }

  const handleValidation = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Required";

    return errors;
  };

  return (
    <div>
      <h1>New Activity</h1>
      <Formik
        initialValues={{
          name: "",
          notes: "",
          // address: "",
          location_description: "",
          location_coordinates: { lat: null, long: null },
          location_place_id: "",
          startDate: "",
          endDate: "",
          image: "",
        }}
        onSubmit={handleSubmit}
        validate={handleValidation}
      >
        {(props) => {
          // console.log(props);
          return (
            <Form>
              <Input name="name" type="text" label="Name" placeholder="Activity name" />
              <ImageUpload
                label="Image"
                name="image"
                value={props.values.image}
                onChange={props.handleChange}
                error={props.errors.image}
              />
              <AddressInput
                locationDescription={props.values.location_description}
                locationCoordinates={props.values.location_coordinates}
                locationPlaceID={props.values.location_place_id}
                // value={props.values.address}
                onChange={props.handleChange}
                name="location_description"
                type="text"
                label="Address"
                placeholder="Address"
              />
              {props.values.location_coordinates && (
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.values.location_coordinates.lat},${props.values.location_coordinates.lng}&zoom=14&size=400x400&key=${process.env.NEXT_PUBLIC_PLACES_API_KEY}`}
                />
              )}
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
