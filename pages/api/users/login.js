import bcrypt from "bcrypt";
import { getUser } from "../../../lib/dbHelpers";
import { createToken } from "../../../lib/tokenHelpers";
import { setTokenCookie } from "../../../lib/cookie";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // Get rid of anyone stupidly using caps in the email address
    const email = req.body.email.toLowerCase();

    // Get the user from the database based on the input email
    const userResponse = await getUser(email);
    const user = JSON.parse(JSON.stringify(userResponse));
    if (!user) throw new Error(`We couldn't find an account for ${email}`);

    // Compare the input password to the stored password
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) throw new Error("Invalid password");

    // Create a new token and send it as a cookie
    const token = await createToken(user);
    setTokenCookie(res, token);

    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailConfirmed: user.emailConfirmed,
      },
    });
  } catch (e) {
    res.status(401).json(e.message);
  }
};
