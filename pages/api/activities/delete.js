import { readToken } from "lib/tokenHelpers";
import { getAuthToken } from "lib/cookie";
import { removeActivity } from "lib/dbHelpers";

export default async (req, res) => {
  if (req.method !== "DELETE") return res.status(405).end();

  try {
    const token = getAuthToken(req);
    const { _id: user } = await readToken(token);

    if (user) {
      const { trip_id, activity_id } = req.body;
      await removeActivity({ trip_id, activity_id });

      //   const { name, notes, image, tags, startDate, endDate, trip_id } = req.body;
      //   console.log("trip", trip_id);

      //   const activity = await addActivity({
      //     trip_id: trip_id,
      //     name: name,
      //     notes: notes,
      //     image: image,
      //     tags: tags,
      //     start_date: startDate,
      //     end_date: endDate,
      //   });

      res.status(201);
      res.json({ activity_id });
    } else {
      console.log("not logged in");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e.message);
  }
};
