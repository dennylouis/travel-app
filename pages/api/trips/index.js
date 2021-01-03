import { getAuthToken } from "../../../lib/cookie";
import { readToken } from "../../../lib/tokenHelpers";
import { getTrips } from "../../../lib/dbHelpers";

export default async (req, res) => {
  try {
    const token = getAuthToken(req);

    if (token) {
      const user = await readToken(token);
      const trip = await getTrips(user._id);
      res.status(200).json({ trip });
    } else {
      throw new Error("Not authenticated");
    }
  } catch (e) {
    res.status(500).json(e);
  }
};
