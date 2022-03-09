import { getUserByEmail } from "lib/dbHelpers";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { email } = req.body;

    const user = await getUserByEmail(email);

    res.status(200);
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
