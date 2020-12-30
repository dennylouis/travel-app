import Iron from "@hapi/iron";

export async function readToken(token) {
  const user = await Iron.unseal(token, process.env.ENCRYPTION_SECRET, Iron.defaults);
  return user;
}

export async function createToken(user) {
  const token = await Iron.seal(user, process.env.ENCRYPTION_SECRET, Iron.defaults);
  return token;
}
