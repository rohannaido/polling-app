import db from "@/db";
import { NextResponse } from "next/server";

type Params = {
    pollId: string;
}

export async function POST(request: Request, context: { params: Params }) {
    const { optionId } = await request.json();
    const pollId = context.params.pollId;

    const vote = await db.vote.create({ data: { pollId, optionId } });
    return NextResponse.json(vote);
}