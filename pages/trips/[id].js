import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readToken } from "lib/tokenHelpers";
import Link from "next/link";
import {
  //  getTripById,
  getTripWithOwner,
} from "../../lib/dbHelpers";
import { getAuthToken } from "lib/cookie";
import useSWR from "swr";

import Modal from "components/Modal/Modal";
import EditActivityForm from "components/Forms/EditActivityForm";
import TripHeader from "components/TripPage/TripHeader/TripHeader";
import CategoryView from "components/TripPage/CategoryView/CategoryView";

export default function TripPage(props) {
  const router = useRouter();
  const { id } = router.query;

  const [activeActivity, setActiveActivity] = useState(null);

  const { data, error } = useSWR(`/api/trips/${id}`, { initialData: { trip: props.trip } });

  useEffect(() => {
    if (!props.user) router.push("/login");
  }, []);

  if (!props.user) return <div />;
  if (!data) return <div>Loading...</div>;

  const { name, _id, activities, owner } = data.trip;

  return (
    <>
      <Modal isOpen={activeActivity} close={() => setActiveActivity(null)} size="large">
        <EditActivityForm
          trip_id={_id}
          activity={activeActivity}
          close={() => setActiveActivity(null)}
        />
      </Modal>

      <div style={{ width: "100%", background: "var(--color-grey-050" }}>
        <TripHeader trip={data.trip} />
        <CategoryView activities={activities} trip_id={_id} setActiveActivity={setActiveActivity} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  try {
    const token = getAuthToken(req);

    if (token) {
      const user = await readToken(token);
      // const trip = await getTripById(params.id);
      const trip = await getTripWithOwner(params.id);

      return { props: { user, trip: JSON.parse(JSON.stringify(trip[0])) } };
    } else {
      throw new Error("Not authenticated");
    }
  } catch (e) {
    return { props: {} };
  }
}
