const db = require('./db');
const charityCollection = db.charityCollection;

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
    return await charityCollection.find({}).toArray() as Charity[];
  } catch (error) {
    console.error('Error fetching charities:', error);
    return [];
  }
}

export async function getCharityById(id: string): Promise<Charity | null> {
  try {
    return await charityCollection.findOne({ _id: id }) as Charity;
  } catch (error) {
    console.error(`Error fetching charity ${id}:`, error);
    return null;
  }
}

export async function getCharitiesByCategory(category: string): Promise<Charity[]> {
  try {
    return await charityCollection.find({ category }).toArray() as Charity[];
  } catch (error) {
    console.error(`Error fetching charities in category ${category}:`, error);
    return [];
  }
} 