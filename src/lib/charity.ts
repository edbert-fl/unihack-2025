const { db } = require('./db');  // Assuming db is the main database connection

export interface Charity {
  _id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  impact?: string[];
}

export async function getAllCharities(): Promise<Charity[]> {
  try {
    return await db.collection('charity').find({}).toArray() as Charity[];
  } catch (error) {
    console.error('Error fetching charities:', error);
    return [];
  }
}

export async function getCharityById(id: string): Promise<Charity | null> {
  try {
    return await db.collection('charity').findOne({ _id: id }) as Charity;
  } catch (error) {
    console.error(`Error fetching charity ${id}:`, error);
    return null;
  }
}

export async function getCharitiesByCategory(category: string): Promise<Charity[]> {
  try {
    return await db.collection('charity').find({ category }).toArray() as Charity[];
  } catch (error) {
    console.error(`Error fetching charities in category ${category}:`, error);
    return [];
  }
}

export async function searchCharities(query: string): Promise<Charity[]> {
  try {
    const charities = await db.collection('charity').find({}).toArray(); // Fetching all charities

    // If the query is empty, return all charities
    if (!query.trim()) {
      return charities;
    }

    // Create a regex pattern from the query, with case-insensitive search
    const regex = new RegExp(query, 'i'); // 'i' flag for case-insensitive search

    // Filter charities using the regex pattern
    const filteredCharities = charities.filter((charity: Charity) =>
      regex.test(charity.name) // Test if the charity name matches the regex
    );

    return filteredCharities;
  } catch (error) {
    console.error('Error searching charities:', error);
    return [];
  }
}
