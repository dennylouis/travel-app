import bcrypt from "bcrypt";
import { createToken } from "lib/tokenHelpers";
import { setTokenCookie } from "lib/cookie";
import { createUser } from "lib/dbHelpers";
import { sendConfirmationEmail } from "lib/sendGrid";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // Save the user in the database
    const user = await createUser({ firstName, lastName, email, password: passwordHash });

    sendConfirmationEmail(user);

    // Create an authentication token and send it as a cookie
    const token = await createToken(user);
    setTokenCookie(res, token);

    res.status(201);
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
