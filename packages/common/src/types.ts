import {email, z} from "zod";

export const CreateUsersSchema=z.object({
    username:z.string().min(3).max(20),
    email:z.email(),
    password:z.string().max(5).max(10)
});

export const SigninSchema=z.object({
    username:z.string().min(3).max(20),
    password:z.string().max(5).max(10)
});

export const RoomSchema=z.object({
    room:z.string()
});