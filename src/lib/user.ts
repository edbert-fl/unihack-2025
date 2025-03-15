const db = require('./db');
const userCollection = db.userCollection;

interface User {
    _id: string;
    profilePicture: string;
    username: string;
    email: string;
    passwordHash: string;
}

export async function createUser(user: User) {
    try {
        const result = await userCollection.insertOne(user);
        return result.insertedId;
    } catch (error) {
        console.error('Error creating user:', error);
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

