'use server';

import { ISession } from '@/src/_models/session.model';
import { db } from '@/src/server/db';
import { SessionStatus } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const createSession = async (data: ISession) => {
    const session = await getServerSession();

    if (!session) {
        return {
            error: 'Unauthorized'
        };
    }

    const { title, slug, startAt, endAt, price, status, categoryId } = data;

    const Schema = z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        startAt: z.date(),
        endAt: z.date(),
        price: z.coerce.number().min(0),
        status: z.nativeEnum(SessionStatus),
        categoryId: z.string().min(1),
    });

    const isValidData = Schema.safeParse({
        title,
        slug,
        startAt,
        endAt,
        price,
        status,
        categoryId,
    });

    if (!isValidData.success) {
        return {
            error: 'Invalid Data',
            details: isValidData.error.flatten()
        };
    }

    try {
        await db.session.create({
            data: {
                title,
                slug,
                startAt,
                endAt,
                price,
                status,
                categoryId,
            }
        });

        revalidatePath('/admin/manage-sessions/sessions');
        return {
            message: 'Session added successfully'
        };
    } catch (error: any) {
        console.error("Error creating session:", error);
        if (error.code === 'P2002') {
            return { error: 'Slug must be unique.' };
        }
        return {
            error: 'Failed to create session'
        };
    }
};

export const updateSession = async (data: ISession) => {
    const session = await getServerSession();

    if (!session) {
        return {
            error: 'Unauthorized'
        };
    }

    const { id, title, slug, startAt, endAt, price, status, categoryId } = data;

    if (!id) {
        return {
            error: "ID is required for update"
        };
    }

    const Schema = z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        startAt: z.date(),
        endAt: z.date(),
        price: z.coerce.number().min(0),
        status: z.nativeEnum(SessionStatus),
        categoryId: z.string().min(1),
    });

    const isValidData = Schema.safeParse({
        title,
        slug,
        startAt,
        endAt,
        price,
        status,
        categoryId,
    });

    if (!isValidData.success) {
        return {
            error: 'Invalid Data',
            details: isValidData.error.flatten()
        };
    }

    try {
        await db.session.update({
            where: {
                id: id
            },
            data: {
                title,
                slug,
                startAt,
                endAt,
                price,
                status,
                categoryId,
            }
        });

        revalidatePath('/admin/manage-sessions/sessions');
        return {
            message: 'Session updated successfully'
        };
    } catch (error: any) {
        console.error("Error updating session:", error);
        if (error.code === 'P2002') {
            return { error: 'Slug must be unique.' };
        }
        return {
            error: 'Failed to update session'
        };
    }
};

export const deleteSession = async (ids: string[]) => {
    const session = await getServerSession();
    if (!session) {
        return {
            error: "Unauthorised"
        }
    }
    try {
        await db.session.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        })
        revalidatePath("/admin/manage-sessions/sessions")
        return {
            message: "Sessions deleted successfully"
        }
    }
    catch (e) {
        console.error("Error deleting session:", e);
        return {
            error: "Sessions deletion error"
        }
    }
}
