import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
    all: protectedProcedure.query(() => {
        return [
            {
                id: 'fake',
                text: 'fake test',
                done: false
            },
            {
                id: 'fake 2',
                text: 'fake test 2',
                done: true
            }

        ]
    })
});
