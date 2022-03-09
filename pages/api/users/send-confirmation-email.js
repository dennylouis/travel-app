import { getUserById } from "lib/dbHelpers";
import { sendConfirmationEmail } from "lib/sendGrid";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { id } = req.body;

    const user = await getUserById(id);
    sendConfirmationEmail(user);

    res.status(200);
    res.json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
