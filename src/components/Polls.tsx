import PollCard from "./Poll";
import type { PollWithOptions } from "@/types";
import { useEffect } from "react";

export default function Polls({ polls }: { polls: PollWithOptions[] }) {
    return <div className="flex flex-row flex-wrap gap-4 w-full">
        {polls.map((poll) => <PollCard key={poll.id} poll={poll} />)}
    </div>;
}