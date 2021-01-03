import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readToken } from "../../lib/tokenHelpers";
import { getTripById } from "../../lib/dbHelpers";
import { getAuthToken } from "../../lib/cookie";
import { formatRange } from "../../lib/dateHelpers";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import CreateActivityForm from "../../components/Forms/CreateActivityForm";
import Modal from "../../components/Modal/Modal";

export default function TripPage({ user, trip }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const { name, start_date, end_date, description, _id, activities } = trip;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  if (!user) return <div />;

  return (
    <>
      <Modal isOpen={showModal} close={() => setShowModal(false)} size="large">
        <CreateActivityForm />
      </Modal>

      <div style={{ width: "100%", padding: "1.5rem" }}>
        <button onClick={() => router.back()}>Back</button>
        <button onClick={() => setShowModal(true)}>Add new activity</button>
        <h1>{name}</h1>
        <p>{formatRange(start_date, end_date)}</p>
        <p>{description}</p>

        {activities?.length > 0 ? (
          activities.map((activity) => {
            return <ActivityCard key={activity._id} activity={activity} />;
          })
        ) : (
          <p>No Activities</p>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  try {
    const token = getAuthToken(req);

    if (token) {
      const user = await readToken(token);
      const trip = await getTripById(params.id);

      return { props: { user, trip: JSON.parse(JSON.stringify(trip)) } };
    } else {
      return { props: {} };
    }
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
}
