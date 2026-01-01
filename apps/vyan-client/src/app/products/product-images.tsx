"use client";
import Image from "next/image";
import { useState } from "react";
interface IProductImages {
  productImages:{
    media: {
      fileUrl: string|null;
    };
  }[]
}
const ProductImages = ({ productImages }: IProductImages) => {
  const [productImage, setProductImage] = useState( productImages[0]?.media.fileUrl
    // "/images/product/prod-1-a.png",
  );
  return (
    <>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="xs:w-[300px] sm:w-[400px] lg:w-[350px]">
          <div className="relative aspect-square w-full">
            <Image
              src={productImage || "/product-fallback.png"}
              fill={true}
              alt="Product-image"
              className="object-cover"
            />
          </div>
        </div>

        {productImages && <div className="flex gap-[14px] lg:order-first lg:flex-col">
        {
          productImages.map( (item, index) => {
            return(
              <>
              <div key={index} className="w-[100px]">
            <div className="relative aspect-square w-full">
              <Image
                onClick={() => {
                  setProductImage(item.media.fileUrl);
                }}
                src={item.media.fileUrl!}
                fill={true}
                alt="Product-image"
                className="object-cover"
              />
            </div>
          </div>
              </>
            )
          })
        }

          
        </div>}
      </div>
    </>
  );
};
export default ProductImages;

{/* <div className="w-[100px]">
            <div className="relative aspect-square w-full">
              <Image
                onClick={() => {
                  setProductImage("/images/product/prod-1-b.png");
                }}
                src="/images/product/prod-1-b.png"
                fill={true}
                alt="Product-image"
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-[100px]">
            <div className="relative aspect-square w-full">
              <Image
                onClick={() => {
                  setProductImage("/images/product/prod-1-c.png");
                }}
                src="/images/product/prod-1-c.png"
                fill={true}
                alt="Product-image"
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-[100px]">
            <div className="relative aspect-square w-full">
              <Image
                onClick={() => {
                  setProductImage("/images/product/prod-1-d.png");
                }}
                src="/images/product/prod-1-d.png"
                fill={true}
                alt="Product-image"
                className="object-cover"
              />
            </div>
          </div> */}