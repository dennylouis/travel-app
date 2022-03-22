import { readToken } from "lib/tokenHelpers";
import { getAuthToken } from "lib/cookie";
import { editActivity } from "lib/dbHelpers";

export default async (req, res) => {
  if (req.method !== "PATCH") return res.status(405).end();

  try {
    const token = getAuthToken(req);
    const { _id: user } = await readToken(token);

    if (user) {
      const {
        name,
        notes,
        image,
        tags,
        // address,
        startDate,
        endDate,
        trip_id,
        activity_id,
        location_description,
        location_coordinates,
        location_place_id,
      } = req.body;
      //   console.log("trip", trip_id);

      console.log(image);

      const activity = await editActivity({
        trip_id: trip_id,
        activity_id: activity_id,
        name: name,
        notes: notes,
        image: image,
        tags: tags,
        // address: address,
        start_date: startDate,
        end_date: endDate,
        location_description: location_description,
        location_coordinates: location_coordinates,
        location_place_id: location_place_id,
      });

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
