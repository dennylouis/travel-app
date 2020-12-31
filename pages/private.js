import { useEffect } from "react";
import { useRouter } from "next/router";
import { readToken } from "../lib/tokenHelpers";
import { getActivities } from "../lib/dbHelpers";
import { getAuthToken } from "../lib/cookie";
import Logout from "../components/Logout/Logout";
import ActivityCard from "../components/ActivityCard/ActivityCard";

export default function Private({ user, activities }) {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  if (!user) return <div />;

  return (
    <div style={{ width: 800, padding: 80 }}>
      <Logout />
      <h1>Welcome {user.firstName}</h1>
      {!user.emailConfirmed && <p>Your email address has not been confirmed</p>}

      <h3>Activities</h3>
      <div>
        {activities.length > 0 ? (
          activities.map((activity) => {
            return <ActivityCard activity={activity} />;
          })
        ) : (
          <p>No activities</p>
        )}
      </div>
    </div>
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
