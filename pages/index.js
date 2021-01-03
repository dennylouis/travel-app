import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readToken } from "../lib/tokenHelpers";
import { getTrips } from "../lib/dbHelpers";
import { getAuthToken } from "../lib/cookie";
import Logout from "../components/Logout/Logout";
import TripCard from "../components/TripCard/TripCard";
import CreateTripForm from "../components/Forms/CreateTripForm";
import Modal from "../components/Modal/Modal";

export default function Dashboard({ user, trips }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  if (!user) return <div />;

  return (
    <>
      <Modal isOpen={showModal} close={() => setShowModal(false)} size="large">
        <CreateTripForm />
      </Modal>

      <div style={{ width: "100%", padding: 80 }}>
        <Logout />
        <h1>Welcome {user.firstName}</h1>
        {!user.emailConfirmed && <p>Your email address has not been confirmed</p>}

        <div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <h2>Trips</h2>
            <button onClick={() => setShowModal(true)}>Create new trip</button>
          </div>

          {trips.length > 0 ? (
            trips.map((trip) => {
              return <TripCard key={trip._id} trip={trip} />;
            })
          ) : (
            <p>No trips</p>
          )}
        </div>

        {/* <pre style={{ background: "#f0f0f0", padding: 16, borderRadius: 8, overflow: "auto" }}>
          {JSON.stringify(user, null, 2)}
        </pre> */}
      </div>
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
