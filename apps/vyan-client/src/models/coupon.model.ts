
export type ICoupon = {
    id:string,
    code:string,
    amount:number,
    isPercent:boolean,
    description:string,
    newUser:boolean,
    categories:{id:string}[],
    products:{id:string}[],
    users:{id:string}[],
    createdAt: Date | undefined,
    expiresAt: Date | undefined,
    updatedAt:Date | undefined,
    numberOfTime:number,
    orders:{id:string}[]
    // orderId: string|null
    active:boolean
}