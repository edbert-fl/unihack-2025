import { DataAPIClient } from "@datastax/astra-db-ts";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new DataAPIClient(process.env.ASTRASB_TOKEN as string);
export const db = client.db(process.env.ASTRADB_ENDPOINT as string);

(async () => {
  const colls = await db.listCollections();
  console.log('Connected to AstraDB:', colls);
})();