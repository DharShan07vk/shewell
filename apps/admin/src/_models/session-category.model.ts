import { Trimester } from "@prisma/client";

export interface ISessionCategory {
    id?: string;
    name: string;
    slug: string;
    trimester: Trimester;
    active?: boolean; // Schema doesn't have active for SessionCategory but general pattern does, omitting for now based on schema
    createdAt?: Date;
    updatedAt?: Date;
}
