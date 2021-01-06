import { getAuthToken } from "../../../lib/cookie";
import {
  // getTripById,
  getTripWithOwner,
} from "../../../lib/dbHelpers";

export default async (req, res) => {
  try {
    const token = getAuthToken(req);

    if (token) {
      // const {
      //   query: { id },
      // } = req;

      // const trip = await getTripById(id);
      const trip = await getTripWithOwner(req.query.id);

      res.status(200).json({ trip: trip[0] });
    } else {
      throw new Error("Not authenticated");
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({ e });
  }
};
