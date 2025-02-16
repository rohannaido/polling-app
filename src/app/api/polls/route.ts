import db from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    const polls = await db.poll.findMany({ include: { options: true } });
    return NextResponse.json(polls);
}

export async function POST(request: Request) {
    const { question, options } = await request.json();
    const poll = await db.poll.create({ data: { question, options: { create: options.map((option: string) => ({ name: option })) } } });
    return NextResponse.json(poll);
}