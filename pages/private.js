import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readToken } from "../lib/tokenHelpers";
import { getActivities } from "../lib/dbHelpers";
import { getAuthToken } from "../lib/cookie";
import Logout from "../components/Logout/Logout";
import ActivityCard from "../components/ActivityCard/ActivityCard";
import CreateActivityForm from "../components/CreateActivityForm/CreateActivityForm";
import Modal from "../components/Modal/Modal";

export default function Private({ user, activities }) {
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
        <CreateActivityForm />
      </Modal>

      <div style={{ width: 600, padding: 80 }}>
        <Logout />
        <h1>Welcome {user.firstName}</h1>
        {!user.emailConfirmed && <p>Your email address has not been confirmed</p>}

        <h3>Activities</h3>
        <button onClick={() => setShowModal(true)}>Add new activity</button>
        <div>
          {activities.length > 0 ? (
            activities.map((activity) => {
              return <ActivityCard key={activity._id} activity={activity} />;
            })
          ) : (
            <p>No activities</p>
          )}
        </div>

        <pre style={{ background: "#f0f0f0", padding: 16, borderRadius: 8, overflow: "auto" }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const token = getAuthToken(req);

    if (token) {
      const user = await readToken(token);
      const activities = await getActivities(user._id);

      return { props: { user, activities: JSON.parse(JSON.stringify(activities)) } };
    } else {
      return { props: {} };
    }
  } catch (e) {
    console.log(e);
    return { props: {} };
  }
}
