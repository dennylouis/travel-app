import { getAuthToken } from "lib/cookie";
import { getTripById, getTripWithOwner } from "lib/dbHelpers";

export default async (req, res) => {
  try {
    const token = getAuthToken(req);

    if (token) {
      // const trip = await getTripById(params.id);
      const trip = await getTripWithOwner(params.id);
      res.status(200).json({ trip });
    } else {
      throw new Error("Not authenticated");
    }
  } catch (e) {
    res.status(500).json(e);
  }
};
