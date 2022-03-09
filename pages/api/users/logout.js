import { removeAuthCookies } from "lib/cookie";

export default async (req, res) => {
  removeAuthCookies(res);
  res.end();
};
