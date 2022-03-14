import { getAuthToken } from "lib/cookie";
import {
  // getTripById,
  getTripWithOwner,
  deleteTrip,
} from "lib/dbHelpers";

export default async (req, res) => {
  try {
    const token = getAuthToken(req);

    if (token) {
      // const {
      //   query: { id },
      // } = req;

      // const trip = await getTripById(id);
      if (req.method === "DELETE") {
        // const trip =
        await deleteTrip(req.query.id);
        // console.log(trip[0].activities);
        res.status(204);
      } else if (req.method === "GET") {
        const trip = await getTripWithOwner(req.query.id);
        // console.log(trip[0].activities);
        res.status(200).json({ trip: trip[0] });
      }
    } else {
      throw new Error("Not authenticated");
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({ e });
  }
};
