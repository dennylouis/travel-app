import { useRouter } from "next/router";
import { Formik } from "formik";

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
      return router.push("/private");
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <Formik initialValues={{ email: "", password: "" }} onSubmit={handleSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
            />
            {props.errors.email && <div id="feedback">{props.errors.email}</div>}
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
            />
            {props.errors.password && <div id="feedback">{props.errors.password}</div>}
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
