import Iron from "@hapi/iron";
import CookieService from "../../../lib/cookie";

export default async (req, res) => {
  try {
    const token = CookieService.getAuthToken(req);

    if (token) {
      const user = await Iron.unseal(token, process.env.ENCRYPTION_SECRET, Iron.defaults);
      res.status(200).json(user);
    } else {
      throw new Error("You're not logged in");
    }
  } catch (e) {
    res.status(400).json(e.message);
  }
};
