import { readToken } from "../../../lib/tokenHelpers";
import { getAuthToken } from "../../../lib/cookie";
import { createActivity } from "../../../lib/dbHelpers";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const token = getAuthToken(req);
    const { _id: user } = await readToken(token);

    if (user) {
      const { title, location, notes, image, tags, startDate, endDate } = req.body;
      const date = [new Date(startDate), new Date(endDate)];

      // console.log({ title, location, notes, image, tags, user, date });
      const activity = await createActivity({
        title,
        location,
        notes,
        image,
        tags,
        user,
        date,
      });

      console.log(activity);
      console.log("is this working?");

      res.status(201);
      res.json({ activity });
    } else {
      console.log("not logged in");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
