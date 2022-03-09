import { readToken } from "lib/tokenHelpers";
import { getAuthToken } from "lib/cookie";
import { createTrip } from "lib/dbHelpers";

export default async (req, res) => {
  if (req.method !== "POST") return res.status(405).end();

  console.log("testing");
  try {
    const token = getAuthToken(req);
    const { _id: owner_id } = await readToken(token);

    if (owner_id) {
      const { name, startDate, endDate, description } = req.body;
      console.log(name);

      // console.log({ title, location, notes, image, tags, user, date });
      const trip = await createTrip({
        name,
        description,
        start_date: startDate,
        end_date: endDate,
        owner_id,
      });

      console.log(trip);
      console.log("is this working?");

      res.status(201);
      res.json({ trip });
    } else {
      console.log("not logged in");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
