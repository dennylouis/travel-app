import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import Input from "components/Input/Input";

export default function Login() {
  const router = useRouter();

  async function handleSubmit(values) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    });

    if (response.ok) {
      return router.push("/");
    }
  }

  return (
    <div style={{ width: 600, padding: 80 }}>
      <h1>Log in</h1>
      <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
        {(props) => (
          <Form>
            <Input name="email" type="email" label="Email" placeholder="Email Address" />
            {props.errors.email && <div id="feedback">{props.errors.email}</div>}

            <Input name="password" type="password" label="Password" placeholder="••••••••••" />
            {props.errors.password && <div id="feedback">{props.errors.password}</div>}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <p>
        Don't have an account yet?{" "}
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </p>
    </div>
  );
}
