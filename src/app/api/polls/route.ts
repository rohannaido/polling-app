import db from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    const polls = await db.poll.findMany({
        include: {
            options: {
                select: {
                    id: true,
                    name: true,
                    _count: { select: { votes: true } },
                },
            },
        }, orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(polls);
}

export async function POST(request: Request) {
    const body = await request.json();

    if (!body?.question || !Array.isArray(body?.options) || body.options.length < 2) {
        return NextResponse.json(
            { error: "Question and at least 2 options are required" },
            { status: 400 }
        );
    }

    const { question, options } = body;

    const poll = await db.poll.create({
        data: {
            question,
            options: {
                create: options.map((option: string) => ({ name: option }))
            }
        }
    });

    return NextResponse.json(poll);
}