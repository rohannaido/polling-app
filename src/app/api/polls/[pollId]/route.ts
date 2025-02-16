import db from "@/db";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    pollId: string;
}

export async function GET(request: NextRequest, context: { params: Params }) {
    const pollId = context.params.pollId;

    const poll = await db.poll.findUnique({
        where: { id: pollId },
        include: {
            options: {
                select: {
                    id: true,
                    name: true,
                    _count: { select: { votes: true } },
                },
            },
        },
    });

    return NextResponse.json(poll);
}