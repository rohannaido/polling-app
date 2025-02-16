"use client";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

export default function CreatePoll({ handleAddPoll }: { handleAddPoll: () => void }) {

    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");

    const handleCreatePoll = async () => {
        const response = await fetch("/api/polls", {
            method: "POST",
            body: JSON.stringify({ question, options: [option1, option2] }),
        });
        if (!response.ok) throw new Error("Failed to create poll");
        await response.json();
        setQuestion("");
        setOption1("");
        setOption2("");
        handleAddPoll();
    }

    return (
        <div className="flex flex-col gap-4 w-[500px]">
            <h1 className="text-2xl font-bold">Create a Poll</h1>
            <Input placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
            <Input placeholder="Option 1" value={option1} onChange={(e) => setOption1(e.target.value)} />
            <Input placeholder="Option 2" value={option2} onChange={(e) => setOption2(e.target.value)} />
            <Button onClick={handleCreatePoll}>Create Poll</Button>
        </div>);
}