import { SessionStatus } from "@prisma/client";

export interface ISession {
    id?: string;
    title: string;
    slug: string;
    startAt: Date;
    endAt: Date;
    price: number; // Decimal in schema, number in TS usually ok, or string/Decimal type
    status: SessionStatus;
    categoryId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
