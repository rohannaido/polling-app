import { Poll, Option } from "@prisma/client";
import type { PollWithOptions } from "@/types";
import { useEffect, useState } from "react";

function fetchPoll(pollId: string) {
    return fetch(`/api/polls/${pollId}`).then(response => response.json()).then(data => data as PollWithOptions);
}

export default function PollCard({ poll }: { poll: PollWithOptions }) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [pollData, setPollData] = useState<PollWithOptions>(poll);

    useEffect(() => {
        setPollData(poll);
    }, [poll]);

    const handleVote = async (optionId: string) => {
        try {
            const response = await fetch(`/api/polls/${poll.id}/vote`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ optionId })
            });
            if (!response.ok) throw new Error('Vote failed');
            setSelectedOption(optionId);
            fetchPoll(poll.id).then(setPollData);
        } catch (error) {
            console.error('Error voting:', error);
        }
    };

    return (
        <div className="border p-4 rounded-md w-[300px]">
            <h2 className="text-lg font-bold">{pollData.question}</h2>
            <div className="flex flex-col gap-2">
                {pollData.options.map((option: any) => (
                    <button
                        key={option.id}
                        onClick={() => handleVote(option.id)}
                        className={`p-2 rounded-md text-left transition-colors
                            ${selectedOption === option.id
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-100'}`}
                    >
                        <div className="flex flex-row justify-between">
                            <p className="text-sm">{option.name}</p>
                            <p className="text-sm">{option._count.votes ? option._count.votes : ""}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}