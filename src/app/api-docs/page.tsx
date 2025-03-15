"use client";

import { Header } from "@/components/ui/navbar";

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">API Documentation</h1>

        <div className="space-y-10">
          {/* Charities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-500">Charities</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Get All Charities</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/charities</code>
                <p className="mt-2 text-gray-300">Returns a list of all charities.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Get Charity by ID</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/charities/{"{id}"}</code>
                <p className="mt-2 text-gray-300">Returns a specific charity by ID.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Get Charities by Category</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/charities/category/{"{category}"}</code>
                <p className="mt-2 text-gray-300">Returns charities filtered by category.</p>
              </div>
            </div>
          </section>
          
          {/* Users */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-500">Users</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Get User by ID</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/users/{"{id}"}</code>
                <p className="mt-2 text-gray-300">Returns a specific user by ID (excludes password hash).</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Create User</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">POST /api/users</code>
                <p className="mt-2 text-gray-300">Creates a new user.</p>
                <h4 className="text-sm font-semibold mt-2 mb-1 text-gray-300">Request body:</h4>
                <pre className="bg-gray-800 p-2 rounded overflow-x-auto text-sm">
{`{
  "username": "string",
  "email": "string",
  "passwordHash": "string",
  "profilePicture": "string"
}`}
                </pre>
              </div>
            </div>
          </section>
          
          {/* Transactions */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-500">Transactions</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Get All Transactions</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/transactions</code>
                <p className="mt-2 text-gray-300">Returns a list of all transactions.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Get Transaction by ID</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/transactions/{"{id}"}</code>
                <p className="mt-2 text-gray-300">Returns a specific transaction by ID.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Create Transaction</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">POST /api/transactions</code>
                <p className="mt-2 text-gray-300">Creates a new transaction.</p>
                <h4 className="text-sm font-semibold mt-2 mb-1 text-gray-300">Request body:</h4>
                <pre className="bg-gray-800 p-2 rounded overflow-x-auto text-sm">
{`{
  "description": "string",
  "amount": "string",
  "recepientWalletAddress": "string",
  "senderWalletAddress": "string",
  "transactionStatus": "string"
}`}
                </pre>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Update Transaction</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">PUT /api/transactions/{"{id}"}</code>
                <p className="mt-2 text-gray-300">Updates an existing transaction.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Get Transactions by Recipient</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/transactions/recipient/{"{address}"}</code>
                <p className="mt-2 text-gray-300">Returns transactions by recipient wallet address.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Get Transactions by Sender</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/transactions/sender/{"{address}"}</code>
                <p className="mt-2 text-gray-300">Returns transactions by sender wallet address.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
                <h3 className="font-semibold text-lg mb-2">Get Transactions by Status</h3>
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded">GET /api/transactions/status?status={"{status}"}</code>
                <p className="mt-2 text-gray-300">Returns transactions by status. Status can be 'success', 'failed', or 'pending'.</p>
              </div>
            </div>
          </section>
          
          {/* Example Usage */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-sky-500">Example Usage</h2>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-black/20">
              <h3 className="font-semibold text-lg mb-2">Frontend Examples</h3>
              <pre className="bg-gray-800 p-4 rounded overflow-x-auto text-sm">
{`// Fetch all charities
const response = await fetch('/api/charities');
const charities = await response.json();

// Create a new transaction
const response = await fetch('/api/transactions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    description: 'Donation to Reforest Peace',
    amount: '100',
    recepientWalletAddress: '0x123...',
    senderWalletAddress: '0x456...',
    transactionStatus: 'Pending'
  }),
});
const result = await response.json();`}
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 