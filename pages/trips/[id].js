import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readToken } from "../../lib/tokenHelpers";
import {
  //  getTripById,
  getTripWithOwner,
} from "../../lib/dbHelpers";
import { getAuthToken } from "../../lib/cookie";
import { formatRange } from "../../lib/dateHelpers";
import useSWR from "swr";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import CreateActivityForm from "../../components/Forms/CreateActivityForm";
import Modal from "../../components/Modal/Modal";
import Header from "../../components/Header/Header";
import Avatar from "../../components/Avatar/Avatar";

export default function TripPage(props) {
  const router = useRouter();
  const { id } = router.query;
  const [showModal, setShowModal] = useState(false);

  const { data, error } = useSWR(`/api/trips/${id}`, { initialData: { trip: props.trip } });

  useEffect(() => {
    if (!props.user) router.push("/login");
  }, []);

  if (!props.user) return <div />;
  if (!data) return <div>Loading...</div>;

  const { name, start_date, end_date, description, _id, activities, owner } = data.trip;

  return (
    <>
      <Modal isOpen={showModal} close={() => setShowModal(false)} size="large">
        <CreateActivityForm trip_id={_id} />
      </Modal>

      <div>
        <Header>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => router.back()} style={{ border: "none", background: "none" }}>
              ←
            </button>
            <span className="text-large" style={{ fontWeight: 700, marginLeft: "0.5rem" }}>
              {name}
            </span>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "auto auto auto", gridGap: "0.5rem" }}
          >
            <button>Category View</button>
            <button>Calendar View</button>
            <button>Map View</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "auto auto", gridGap: "0.5rem" }}>
            <Avatar user={owner[0]} />
            {/* <Avatar user={{ firstName: "Alison" }} /> */}
          </div>
        </Header>

        <div style={{ width: "100%", padding: "1.5rem", background: "var(--color-grey-020" }}>
          <button onClick={() => setShowModal(true)}>Add new activity</button>
          <p>{formatRange(start_date, end_date)}</p>
          <p>{description}</p>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridColumnGap: "1rem" }}
          >
            {activities?.length > 0 ? (
              activities.map((activity) => {
                return <ActivityCard key={activity._id} activity={activity} />;
              })
            ) : (
              <p>No Activities</p>
            )}
          </div>
        </div>
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
