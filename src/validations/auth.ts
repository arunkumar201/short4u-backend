import * as z from "zod";

export interface User {
	name: string;
	age: number;
	email: string;
}

export const userSchema = z.object({
	name: z.string().min(4),
	age: z.number().positive(),
	email: z.string().email(),
});
