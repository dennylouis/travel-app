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

export async function getUserById(id) {
  const { db } = await connect();
  const result = await db.collection("Users").findOne({ _id: ObjectID(id) });

  return result;
}

export async function getUserByEmail(email) {
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

export async function updateUserActivity(userId, activityId) {
  const { db } = await connect();
  const result = await db
    .collection("Users")
    .updateOne({ user: ObjectID(userId) }, { $set: { activities: ObjectID(activityId) } });

  return result;
}

export async function createActivity({ title, location, notes, image, tags, user, date }) {
  const { db } = await connect();

  const result = await db.collection("Activities").insertOne({
    title,
    location,
    notes,
    image,
    tags,
    user: ObjectID(user),
    date,
    createdAt: new Date(),
  });

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

export async function getTrips(userId) {
  const { db } = await connect();
  const result = await db
    .collection("trips")
    .find({ owner_id: ObjectID(userId) })
    .toArray();

  return result;
}

export async function getTripById(tripId) {
  const { db } = await connect();
  const result = await db.collection("trips").findOne({ _id: ObjectID(tripId) });

  return result;
}

export async function createTrip({ name, description, start_date, end_date, owner_id }) {
  const { db } = await connect();

  const result = await db.collection("trips").insertOne({
    name,
    description,
    start_date,
    end_date,
    owner_id: ObjectID(owner_id),
    createdAt: new Date(),
  });

  const trip = result.ops[0];

  return trip;
}
