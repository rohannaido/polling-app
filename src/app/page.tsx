"use client";

import CreatePoll from "@/components/CreatePoll";
import Polls from "@/components/Polls";
import { PollWithOptions } from "@/types";
import { useState, useEffect } from "react";

async function fetchPolls(): Promise<PollWithOptions[]> {
  const response = await fetch("/api/polls");
  return response.json();
}

export default function Home() {
  const [polls, setPolls] = useState<PollWithOptions[]>([]);

  useEffect(() => {
    fetchPolls().then(setPolls);
  }, []);

  return (
    <div>
      <CreatePoll />
      <div className="flex flex-col gap-4 w-[500px]">
        <h1 className="text-2xl font-bold">Polls</h1>
        <Polls polls={polls} />
      </div>
    </div>
  );
}
