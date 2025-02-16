import db from "@/db";
import { NextResponse } from "next/server";

type Params = {
    pollId: string;
}

export async function GET(request: Request, context: { params: Params }) {
    const pollId = context.params.pollId;

    const poll = await db.poll.findUnique({ where: { id: pollId }, include: { options: { include: { votes: true } } } });

    return NextResponse.json(poll);
}