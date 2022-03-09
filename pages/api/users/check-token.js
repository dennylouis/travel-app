import { readToken } from "lib/tokenHelpers";
import { getAuthToken } from "lib/cookie";

export default async (req, res) => {
  try {
    const token = getAuthToken(req);

    if (token) {
      const user = await readToken(token);
      res.status(200).json(user);
    } else {
      throw new Error("You're not logged in");
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};
