import { useEffect } from "react";
import { useRouter } from "next/router";
import { readToken } from "lib/tokenHelpers";
import { getAuthToken } from "lib/cookie";
import Logout from "components/Logout/Logout";
import Header from "components/Header/Header";
import Avatar from "components/Avatar/Avatar";
import Link from "next/link";

export default function Dashboard(props) {
  const router = useRouter();

  const { user } = props;

  useEffect(() => {
    if (!user) router.push("/login");
  }, []);

  if (!user) return <div />;

  return (
    <div style={{ background: "var(--color-grey-020)" }}>
      <Header>
        <button onClick={router.back}>Back</button>
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

      <div style={{ width: "100%", padding: "5rem" }}>
        <Avatar user={user} />
        <p>
          {user.firstName} {user.lastName}
        </p>
        <p>{user.email}</p>
        {!user.emailConfirmed && <p>Your email address has not been confirmed</p>}
      </div>
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
    return { props: {} };
  }
}
