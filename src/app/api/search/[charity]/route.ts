import { NextResponse } from "next/server";

export async function GET({ params }: { params: { charity: string } }) {
    const charity = params.charity;
    const URL = `https://serpapi.com/search.json?engine=google&q=${charity}`;
    
    try {
        const response = await fetch(URL)
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}