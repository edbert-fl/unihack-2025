import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Fix: Remove any trailing slash from endpoint to avoid double slash issue
const endpoint = process.env.ASTRADB_ENDPOINT?.replace(/\/+$/, "");
const token = process.env.ASTRADB_TOKEN;

console.log('Trying to connect with:');
console.log('- Token:', token ? `${token.slice(0, 5)}...` : 'missing');
console.log('- Endpoint:', endpoint || 'missing');

const client = new DataAPIClient(token);
const db = client.db(endpoint!);

// Create collections
const charityCollection = db.collection('charity');

// Export for use in other modules
export { db };

(async () => {
  try {
    // Basic connection test
    console.log('Testing connection...');
    const colls = await db.listCollections();
    console.log('Connected to AstraDB successfully!');
    console.log('Available collections:', colls);
    
    // Query a collection
    console.log('\nQuerying charity collection...');
    const charities = await charityCollection.find({}).limit(5).toArray();
    
    console.log(`Found ${charities.length} charities:`);
    charities.forEach((charity: any, i: number) => {
      console.log(`${i + 1}. ${charity.name || charity._id}`);
    });
    
  } catch (error: any) {
    console.error('Error connecting to AstraDB:', error.message);
    
    // More detailed error information
    if (error.status) {
      console.error(`Status: ${error.status}`);
    }

    console.log("\nPossible solutions:");
    console.log("1. Check your token and endpoint in .env.local");
    console.log("2. Make sure your database is active in the Astra console");
    console.log("3. Check network connectivity");
    console.log("4. Try a different keyspace name");
  }
})();