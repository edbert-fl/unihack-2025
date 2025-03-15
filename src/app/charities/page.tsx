"use client";
import React, { useState, useEffect } from "react";
import type { Charity } from "@/lib/charity";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { Header } from "@/components/ui/navbar";


export default function CharitiesPage() {
    const [charities, setCharities] = useState<Charity[]>([]);
    const [search, setSearch] = useState("");
    const [filteredCharities, setFilteredCharities] = useState<Charity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchCharities = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/charities');
                
                if (!response.ok) {
                    throw new Error(`Error fetching charities: ${response.status}`);
                }
                
                const data = await response.json();
                setCharities(data);
                setFilteredCharities(data);
                setError(null);
            } catch (error) {
                console.error("Error fetching charities:", error);
                setError("Failed to load charities. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchCharities();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = charities.filter((charity) => 
            charity.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCharities(filtered);
    };

    return (
        <div className="min-h-screen bg-background">
            <ShootingStars />
            <Header />  
            <div className="container mx-auto p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold">Charities</h1>
                    <Input
                        type="text"
                        placeholder="Search charities"
                        value={search}
                        onChange={handleSearch}
                        className="w-1/2"
                    />
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                ) : filteredCharities.length === 0 ? (
                    <p className="text-gray-500">No charities found</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCharities.map((charity) => (
                                <TableRow key={charity._id}>
                                    <TableCell>{charity.name}</TableCell>
                                    <TableCell>{charity.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}