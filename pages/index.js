import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readToken } from "../lib/tokenHelpers";
import { getTrips } from "../lib/dbHelpers";
import { getAuthToken } from "../lib/cookie";
import { isBeforeToday, isAfterToday } from "../lib/dateHelpers";
import Logout from "../components/Logout/Logout";
import TripCard from "../components/TripCard/TripCard";
import CreateTripForm from "../components/Forms/CreateTripForm";
import Modal from "../components/Modal/Modal";
import Header from "../components/Header/Header";
import Avatar from "../components/Avatar/Avatar";
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
  const { trips } = data;

  if (!user) return <div />;

  const upcomingTrips = trips.filter(({ start_date }) => isAfterToday(start_date));
  const completedTrips = trips.filter(({ end_date }) => isBeforeToday(end_date));
  const currentTrips = trips.filter(
    ({ start_date, end_date }) => isBeforeToday(start_date) && isAfterToday(end_date)
  );

  return (
    <>
      <Modal isOpen={showModal} close={() => setShowModal(false)} size="large">
        <CreateTripForm />
      </Modal>

      <div style={{ background: "var(--color-grey-020)" }}>
        <Header>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridGap: "0.5rem",
              alignItems: "center",
            }}
          >
            <Avatar user={user} />
            <p className="text-medium">
              {user.firstName} {user.lastName} • {user.email}
              {!user.emailConfirmed && " • Your email address has not been confirmed"}
            </p>
          </div>
          <Logout />
        </Header>

        <div style={{ width: "100%", padding: "5rem" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <h1>Your Trips</h1>

            <button onClick={() => setShowModal(true)}>Create new trip</button>
          </div>

          {currentTrips.length > 0 && (
            <div style={{ padding: "2.5rem 0", borderBottom: "1px solid var(--color-grey-100" }}>
              <h2 style={{ margin: "0 0 1rem 0" }}>Current</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gridColumnGap: "1rem",
                }}
              >
                {currentTrips.map((trip) => {
                  return <TripCard key={trip._id} trip={trip} />;
                })}
              </div>
            </div>
          )}
          {upcomingTrips.length > 0 && (
            <div style={{ padding: "2.5rem 0", borderBottom: "1px solid var(--color-grey-100" }}>
              <h2 style={{ margin: "0 0 1rem 0" }}>Upcoming</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gridColumnGap: "1rem",
                }}
              >
                {upcomingTrips.map((trip) => {
                  return <TripCard key={trip._id} trip={trip} />;
                })}
              </div>
            </div>
          )}

          {completedTrips.length > 0 && (
            <div style={{ padding: "2.5rem 0", borderBottom: "1px solid var(--color-grey-100" }}>
              <h2 style={{ margin: "0 0 1rem 0" }}>Completed</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  gridColumnGap: "1rem",
                }}
              >
                {completedTrips.map((trip) => {
                  return <TripCard key={trip._id} trip={trip} completed />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <pre style={{ background: "#f0f0f0", padding: 16, borderRadius: 8, overflow: "auto" }}>
          {JSON.stringify(user, null, 2)}
        </pre> */}
      {/* </div> */}
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const token = getAuthToken(req);

    if (token) {
      const user = await readToken(token);
      const trips = await getTrips(user._id);

      return { props: { user, trips: JSON.parse(JSON.stringify(trips)) } };
    } else {
      return { props: {} };
    }
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
}
