import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import Input from "../components/Input/Input";

export default function Signup() {
  const router = useRouter();

  async function handleSubmit(values) {
    const response = await fetch("/api/users/create", {
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
      <h1>Sign up</h1>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form>
            <Input name="firstName" type="text" label="First Name" placeholder="First Name" />
            {props.errors.firstName && <div id="feedback">{props.errors.firstName}</div>}

            <Input name="lastName" type="text" label="Last Name" placeholder="Last Name" />
            {props.errors.lastName && <div id="feedback">{props.errors.lastName}</div>}

            <Input name="email" type="email" label="Email" placeholder="Email Address" />
            {props.errors.email && <div id="feedback">{props.errors.email}</div>}

            <Input name="password" type="password" label="Password" placeholder="••••••••••" />
            {props.errors.password && <div id="feedback">{props.errors.password}</div>}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <p>
        Already have an account?{" "}
        <Link href="/login">
          <a>Log in</a>
        </Link>
      </p>
    </div>
  );
}
