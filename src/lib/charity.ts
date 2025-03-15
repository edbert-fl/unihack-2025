import { db } from './db';

export interface Charity {
  _id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  profilePicture?: string;
  donationEffectCostPer?: number;
  donationEffectText?: string;
  impact?: string[];
}

export async function getAllCharities(): Promise<Charity[]> {
  try {
    const results = await db.collection('charity').find({}).toArray();
    return results as unknown as Charity[];
  } catch (error) {
    console.error('Error fetching charities:', error);
    return [];
  }
}

export async function getCharityById(id: string): Promise<Charity | null> {
  try {
    const result = await db.collection('charity').findOne({ _id: id });
    return result as unknown as Charity;
  } catch (error) {
    console.error(`Error fetching charity ${id}:`, error);
    return null;
  }
}

export async function getCharitiesByCategory(category: string): Promise<Charity[]> {
  try {
    const results = await db.collection('charity').find({ category }).toArray();
    return results as unknown as Charity[];
  } catch (error) {
    console.error(`Error fetching charities in category ${category}:`, error);
    return [];
  }
} 

export async function searchCharities(query: string): Promise<Charity[]> {
  try {
    const charities = await db.collection('charity').find({}).toArray();
    const charitiesArray = charities as unknown as Charity[];

    // If the query is empty, return all charities
    if (!query.trim()) {
      return charitiesArray;
    }

    // Create a regex pattern from the query, with case-insensitive search
    const regex = new RegExp(query, 'i'); // 'i' flag for case-insensitive search

    // Filter charities using the regex pattern
    const filteredCharities = charitiesArray.filter((charity: Charity) =>
      regex.test(charity.name) // Test if the charity name matches the regex
    );

    return filteredCharities;
  } catch (error) {
    console.error('Error searching charities:', error);
    return [];
  }
}

export { db };