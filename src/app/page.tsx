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

    const interval = setInterval(() => {
      fetchPolls().then(polls => {
        setPolls(polls);
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAddPoll = () => {
    fetchPolls().then(setPolls);
  }

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-col gap-4 w-[500px] mt-10">
        <CreatePoll handleAddPoll={handleAddPoll} />
      </div>
      <h1 className="text-2xl font-bold mt-10 mb-10">Polls</h1>
      <div className="flex flex-col gap-4">
        <Polls polls={polls} />
      </div>
    </div>
  );
}
