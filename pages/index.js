import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { readToken } from "lib/tokenHelpers";
import { getTrips, getSharedTrips } from "lib/dbHelpers";
import { getAuthToken } from "lib/cookie";
import { isBeforeToday, isAfterToday } from "lib/dateHelpers";
import Logout from "components/Logout/Logout";
import TripCard from "components/TripCard/TripCard";
import TripRow from "components/TripRow/TripRow";
import CreateTripForm from "components/Forms/CreateTripForm";
import Modal from "components/Modal/Modal";
import Header from "components/Header/Header";
import Avatar from "components/Avatar/Avatar";
import useSWR from "swr";

export default function Dashboard(props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const { user } = props;
  const { data, error } = useSWR(`/api/trips/`, { initialData: { trips: props.trips } });

  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  if (!user) return <div />;
  if (!data) return <div>Loading...</div>;

  // const { name, start_date, end_date, description, _id, activities, owner } = data.trips;
  console.log(props);
  const { trips } = data;

  const upcomingTrips = trips?.filter(({ start_date }) => isAfterToday(start_date));
  const completedTrips = trips?.filter(({ end_date }) => isBeforeToday(end_date));
  const currentTrips = trips?.filter(
    ({ start_date, end_date }) => isBeforeToday(start_date) && isAfterToday(end_date)
  );

  return (
    <>
      <Modal isOpen={showModal} close={() => setShowModal(false)} size="large">
        <CreateTripForm />
      </Modal>

      <div style={{ background: "var(--color-background)" }}>
        <Header>
          <h3>Home</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridGap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Link href="/account">
              <a>
                <Avatar user={user} />
              </a>
            </Link>
            <Logout />
          </div>
        </Header>

        <div style={{ width: "100%", padding: "0" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "3rem var(--page-margin) 0",
            }}
          >
            <h1>Your Trips</h1>

            <button onClick={() => setShowModal(true)}>Create new trip</button>
          </div>

          {currentTrips.length > 0 && <TripRow title="Current" trips={currentTrips} />}
          {upcomingTrips.length > 0 && <TripRow title="Upcoming" trips={upcomingTrips} />}
          {completedTrips.length > 0 && <TripRow title="Completed" trips={completedTrips} />}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const token = getAuthToken(req);

    if (token) {
      const user = await readToken(token);
      const owned = await getTrips(user._id);
      const shared = await getSharedTrips(user._id);

      const trips = [...owned, ...shared];
      console.log(owned, shared, trips);

      return { props: { user, trips: JSON.parse(JSON.stringify(trips)) } };
    } else {
      return { props: {} };
    }
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
}
