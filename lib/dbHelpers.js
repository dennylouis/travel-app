import { connect } from "./database";
import { ObjectID } from "mongodb";

export async function createUser({ firstName, lastName, email, password }) {
  const { db } = await connect();

  const result = await db.collection("Users").insertOne({
    firstName,
    lastName,
    email,
    password,
    createdAt: new Date(),
    emailConfirmed: false,
  });

  const user = result.ops[0];
  return user;
}

export async function getUser(email) {
  const { db } = await connect();
  const result = await db.collection("Users").findOne({ email });

  return result;
}

export async function confirmUserEmail(email) {
  const { db } = await connect();
  const result = await db
    .collection("Users")
    .updateOne({ email }, { $set: { emailConfirmed: true } });

  return result;
}

export async function addActivity({ title, location, notes, image, tags, user, date }) {
  const { db } = await connect();
  const result = await db
    .collection("Activites")
    .insertOne({ title, location, notes, image, tags, user, date, createdAt: new Date() });

  const activity = result.ops[0];
  return activity;
}

export async function getActivities(user) {
  const { db } = await connect();
  const result = await db
    .collection("Activities")
    .find({ user: ObjectID(user) })
    .toArray();

  return result;
}
