import PollCard from "./Poll";
import type { PollWithOptions } from "@/types";

export default function Polls({ polls }: { polls: PollWithOptions[] }) {
    return <div>
        {polls.map((poll) => <PollCard key={poll.id} poll={poll} />)}
    </div>;
}