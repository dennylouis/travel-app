import { connect } from "../../../lib/database";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { db } = await connect();
    const { email } = req.body;

    const result = await db
      .collection("Users")
      .updateOne({ email }, { $set: { emailConfirmed: true } });

    console.log(email);
    const user = result;

    res.status(201);
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
