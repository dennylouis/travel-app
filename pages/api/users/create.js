import bcrypt from "bcrypt";
import Iron from "@hapi/iron";
import CookieService from "../../../lib/cookie";
import { connect } from "../../../lib/database";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { db } = await connect();
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    // Save the user in the database
    const result = await db.collection("Users").insertOne({
      firstName,
      lastName,
      email,
      password: passwordHash,
      createdAt: new Date(),
      emailConfirmed: false,
    });
    const user = result.ops[0];

    // Create an authentication token and send it as a cookie
    const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults);
    CookieService.setTokenCookie(res, token);

    res.status(201);
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
