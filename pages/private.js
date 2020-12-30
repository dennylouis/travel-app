import { useEffect } from "react";
import { useRouter } from "next/router";
import { readToken } from "../lib/tokenHelpers";
import CookieService from "../lib/cookie";

export default function Private({ user }) {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <p>{user ? "is logged in" : "not logged in"}</p>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const token = CookieService.getAuthToken(req);

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
