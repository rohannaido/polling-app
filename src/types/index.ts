import { Poll, Option } from "@prisma/client";

export type PollWithOptions = Poll & {
    options: Option[];
}