// import bcrypt from "bcrypt";
// import Iron from "@hapi/iron";
// import { getUser } from "../../../lib/dbHelpers";
// import CookieService from "../../../lib/cookie";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    //     // Get rid of anyone stupidly using caps in the email address
    //     req.body.email = req.body.email.toLowerCase();

    //     // Get the user from the database based on the input email
    //     const userResponse = await getUser(req.body.email);
    //     const user = JSON.parse(JSON.stringify(userResponse));
    //     if (!user) throw new Error(`We couldn't find an account for ${req.body.email}`);

    //     // Compare the input password to the stored password
    //     const valid = await bcrypt.compare(req.body.password, user.password);
    //     if (!valid) throw new Error("Invalid password");

    //     // Don't send the hashed password to the browser
    //     delete user.password;

    //     // Create a new token and send it as a cookie
    //     const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults);
    //     CookieService.setTokenCookie(res, token);

    res.status(200).end();
  } catch (e) {
    res.status(401).json(e.message);
  }
};
