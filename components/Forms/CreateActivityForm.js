import { Formik, Form } from "formik";
import useSWR, { useSWRConfig } from "swr";
import axios from "axios";
import FeatureInput from "components/FeatureInput/Input";
import Input from "components/Input/Input";
import AddressInput from "components/AddressInput/AddressInput";
import ImageUpload from "components/ImageUpload/ImageUpload";
// import styles from "./CreateActivityForm.module.scss";

export default function CreateActivityForm({ trip_id, close }) {
  const { mutate } = useSWRConfig();
  // console.log(trip_id);
  async function handleSubmit(values) {
    // await axios.get(URL, {
    const response = await fetch("/api/activities/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values, trip_id }),
    });

    console.log(response);

    if (response.ok) {
      // console.log(`/api/trips/${trip_id}`, mutate);
      const data = await mutate(`/api/trips/${trip_id}`);
      console.log(data);
      close();
    }
  }

  const handleValidation = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Required";

    return errors;
  };

  return (
    <div>
      {/* <h1>New Activity</h1> */}
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
              <ImageUpload
                label="Image"
                name="image"
                value={props.values.image}
                onChange={props.handleChange}
                error={props.errors.image}
              />
              <div style={{ padding: "0.5rem 1rem" }}>
                <FeatureInput name="name" type="text" label="Name" placeholder="Activity name" />
                <Input name="notes" type="text" label="Notes" placeholder="Notes" />
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

                <Input name="startDate" type="date" label="Start Date" placeholder="Notes" />
                <Input name="endDate" type="date" label="End Date" placeholder="Notes" />
              </div>
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
