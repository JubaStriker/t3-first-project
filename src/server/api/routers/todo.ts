import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { todoInput } from "~/types";


export const todoRouter = createTRPCRouter({
    all: protectedProcedure.query(async ({ ctx }) => {
        const todos = await ctx.prisma.todo.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        });
        return todos.map(({ id, text, done }) => ({ id, text, done }));
    }),
    create: protectedProcedure.input(todoInput).mutation(({ ctx, input }) => {
        // throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        return ctx.prisma.todo.create({
            data: {
                text: input,
                user: {
                    connect: {
                        id: ctx.session.user.id,
                    },
                },
            },
        });
    }),
});
