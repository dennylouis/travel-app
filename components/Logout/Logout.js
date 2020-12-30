import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  async function handleClick() {
    const response = await fetch("/api/users/logout");
    console.log(response);

    if (response.ok) {
      router.push("/login");
    }
  }

  return <button onClick={handleClick}>Logout</button>;
}
