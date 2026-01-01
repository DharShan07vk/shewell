'use server'
import { db } from "~/server/db"

export const fetchCities = async(stateId: string) => {
    const cities = await db.state.findFirst({
        where:{
            id: stateId,
        },
        select:{
            cities: true
        }
    })
    return cities
}