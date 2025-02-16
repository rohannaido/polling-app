import { Poll, Option } from "@prisma/client";
import type { PollWithOptions } from "@/types";

export default function PollCard({ poll }: { poll: PollWithOptions }) {
    return (
        <div>
            <h2>{poll.question}</h2>
            <p>{poll.options.map((option: Option) => option.name).join(", ")}</p>
        </div>
    );
}