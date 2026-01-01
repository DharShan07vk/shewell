'use client'


import { IProduct } from "~/models/product-model";
import WishListCard from "./wishlist-card";
import { IReview } from "~/models/review.model";

const WishlistedProducts=({wishlistedProducts,reviews}:{wishlistedProducts:IProduct[],reviews:IReview[]})=>{
    return(
        <>
        {wishlistedProducts.map((item)=>(
            <WishListCard item={item} reviews={reviews}/>
        ))}
        </>
    )
}

export default WishlistedProducts;