import { getAuthToken } from "../../../lib/cookie";
import { getTripById } from "../../../lib/dbHelpers";

export default async (req, res) => {
  try {
    const token = getAuthToken(req);

    if (token) {
      const {
        query: { id },
      } = req;

      const trip = await getTripById(id);
      res.status(200).json({ trip });
    } else {
      throw new Error("Not authenticated");
    }
  } catch (e) {
    res.status(500).json(e);
  }
};
