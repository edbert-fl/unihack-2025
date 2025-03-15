import { db } from "./db";
const userCollection = db.collection("user");

export interface User {
  _id: string;
  profilePicture: string;
  username: string;
  email: string;
  passwordHash: string;
  filter: any[];
}

export async function createUser(user: User) {
  try {
    const result = await userCollection.insertOne(user);
    return result.insertedId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const result = await userCollection.findOne({ _id: id });
    return result as User | null;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await userCollection.find({}).toArray();
    return users as User[];
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}
