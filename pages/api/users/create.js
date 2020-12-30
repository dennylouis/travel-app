import bcrypt from "bcrypt";
import { createToken } from "../../../lib/tokenHelpers";
import CookieService from "../../../lib/cookie";
import { createUser } from "../../../lib/dbHelpers";
import sgMail from "../../../lib/sendGrid";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // Save the user in the database
    const user = await createUser({ firstName, lastName, email, password: passwordHash });

    const emailResult = await sgMail.send({
      to: "dennymlouis@gmail.com",
      from: "denny@dennylouis.com",
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      // body of the email needs to contain a link to go to the website
      // and call the update the "confirm email" api endpoint
      html: `<strong>and easy to do anywhere, even with Node.js</strong>
      <p>${JSON.stringify(user, null, 2)}</p>`,
    });
    console.log(emailResult, "email sent");

    // Create an authentication token and send it as a cookie
    const token = await createToken(user);
    CookieService.setTokenCookie(res, token);

    res.status(201);
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
