import { useEffect } from "react";
import { useRouter } from "next/router";
import { readToken } from "../lib/tokenHelpers";
import { getAuthToken } from "../lib/cookie";
import Logout from "../components/Logout/Logout";

export default function Private({ user }) {
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
      {user && (
        <pre style={{ background: "#f0f0f0", padding: 16, borderRadius: 8 }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      )}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const token = getAuthToken(req);

    if (token) {
      const user = await readToken(token);
      return { props: { user } };
    } else {
      return { props: {} };
    }
  } catch (e) {
    console.log(e);
  }
}
