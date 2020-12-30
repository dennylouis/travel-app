import { useRouter } from "next/router";
import { Formik } from "formik";

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
      return router.push("/private");
    }
  }

  return (
    <div>
      <h1>Sign up</h1>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.firstName}
            />
            {props.errors.firstName && <div id="feedback">sdf{props.errors.firstName}</div>}
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.lastName}
            />
            {props.errors.lastName && <div id="feedback">{props.errors.lastName}</div>}
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
