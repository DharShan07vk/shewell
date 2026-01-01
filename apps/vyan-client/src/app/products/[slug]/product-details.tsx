"use client";
import { Button } from "@repo/ui/src/@/components/button";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ProductImages from "../product-images";
import ProductDescRevFaq from "../product-desc-rev-faq";
import ProductDescription from "../product-description";
import ProductReview from "../product-review";
import ProductFAQ from "../product-faq";
import Link from "next/link";
import Description from "../description";
import ShareButton from "./share-btn";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import WishlistBtn from "~/components/shared/wishlist-btn";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/src/@/components/breadcrumb";
import { currencyFormatter } from "~/lib/currency";
import { IReview } from "~/models/review.model";
import { IProduct } from "~/models/product-model";
import { db } from "~/server/db";
import {
  calculateDiscountedPrice,
  getDiscountString,
} from "~/lib/discountPrice";
import { toast } from "@repo/ui/src/@/components/use-toast";
import { useCartStore } from "~/store/cart.store";
import { ToastAction } from "@repo/ui/src/@/components/toast";
import Image from "next/image";

const features = [
  {img : "/images/shipping.png",
    title : "Free Shipping",
    description : "Free Delievery,shipping, no minimun order, all over India."
  },
  {
   img : "/images/money-guarantee.png",
    title : "Money Guarantee",
    description : "Free feel to return within 7 days for an exchange with any other."
  },
  {
    img : "/images/customer-support.png",
    title : "Support 24/7",
    description : "Reach us 24 hours, 7 days a week. We are always there to assist you."
  },
  {
    img : "/images/secured-payment.png",
    title : "Secured Payments",
    description : "Secure Payments for domestic and international users"
  }
]
interface IProductDetailsProps {
  // productDetails: {
  //   id: string;
  //   name: string;
  //   slug: string;
  //   shortDescription: string;
  //   description: string;
  //   seoTitle: string;
  //   seoDescription: string;
  //   review: {
  //     id: string;
  //     review: string;
  //     rating: number;
  //     productId: string;
  //     approved: boolean;
  //     createdAt: Date;
  //     user: {
  //       id: string;
  //       name: string;
  //       email: string;
  //     };
  //   };
  //   productVariants: {
  //     id: string;
  //     name: string;
  //     priceInCents: number;
  //     discountInCents: number;
  //     discountInPercentage: number;
  //     discountEndDate: Date;
  //     productVariantInventory: {
  //       id: string;
  //       available: boolean;
  //       productVariantId: string;
  //     };
  //   }[];
  //   mediaOnProducts: {
  //     media: {
  //       fileKey: string;
  //       fileUrl: string;
  //     };
  //   };
  //   userWishlisted: {
  //     email: string;
  //   };
  // };
  productDetails: IProduct;
  productReview: IReview[];
}

const ProductDetails = ({
  productDetails,
  productReview,
}: IProductDetailsProps) => {
  const StarDrawing = (
    <path d="M15.1533 1.24496C14.6395 0.359428 13.3607 0.359425 12.8468 1.24496L9.2281 7.48137C8.97427 7.91882 8.53553 8.21734 8.03545 8.29287L1.2537 9.31717C0.114654 9.48921 -0.284892 10.9274 0.602182 11.6623L5.6543 15.8479C6.12196 16.2354 6.34185 16.8465 6.22825 17.4431L4.90669 24.3833C4.69778 25.4804 5.8495 26.3328 6.8377 25.8125L13.2236 22.4501C13.7096 22.1941 14.2905 22.1941 14.7766 22.4501L21.1625 25.8125C22.1507 26.3328 23.3024 25.4804 23.0935 24.3833L21.7719 17.4431C21.6583 16.8465 21.8782 16.2354 22.3459 15.8479L27.398 11.6623C28.285 10.9274 27.8855 9.48921 26.7465 9.31717L19.9647 8.29287C19.4646 8.21734 19.0259 7.91882 18.7721 7.48137L15.1533 1.24496Z" />
  );
  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: "#00898F",
    inactiveFillColor: "#B5B5B5",
  };
  let totalRating;
  if (productReview.length > 0) {
    totalRating = productReview.reduce((total, item) => {
      return total + Number(item.rating);
    }, 0);
  }
  const avgRating = totalRating
    ? (totalRating / productReview.length).toFixed(2)
    : 0;

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, buyNow } = useCartStore((state) => {
    return {
      addToCart: state.addToCart,
      buyNow: state.buyNow,
    };
  });
  const [selectedVariant, setSelectedVarient] = useState(
    (productDetails.productVariants &&
      productDetails.productVariants[0] &&
      productDetails.productVariants[0].id) ||
      "",
  );
  const varients = productDetails.productVariants?.find(
    (varient) => varient.id === selectedVariant,
  );
  const [isProductAvailable, setIsProductAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (varients) {
      const available =
        varients.productVariantInventory != null &&
        Number(varients.productVariantInventory.available) > 0;

      setIsProductAvailable(available);
    }
  }, [varients]);

  const handleBuyNow = () => {
    router.push("/cart");
    const productSelectedVariant = productDetails.productVariants.find(
      (f) => f.id === selectedVariant,
    );
    if (!productSelectedVariant) {
      toast({
        title: "Product Variant not selected",
        variant: "destructive",
      });
      return;
    }

    buyNow(productDetails, quantity, productSelectedVariant);
  };

  const handleAddToCart = () => {
    const productSelectedVariant = productDetails.productVariants.find(
      (f) => f.id === selectedVariant,
    );
    if (!productSelectedVariant) {
      toast({
        title: "Product Variant not selected",
        variant: "destructive",
      });
      return;
    }
    if (
      productSelectedVariant.productVariantInventory == null ||
      Number(productSelectedVariant.productVariantInventory.available) <= 0
    ) {
      return toast({
        title: "Product not available right now",
        variant: "destructive",
      });
    } else {
      addToCart(productDetails, quantity, productSelectedVariant);
      toast({
        title: "Added to cart",
        action: (
          <ToastAction onClick={() => router.push("/cart")} altText="Goto cart">
            Go to cart
          </ToastAction>
        ),
      });
    }
  };

  const pathname = usePathname();

  const Features = ({
    img ,
    title,
    description,
  }: {
    img : string;
    title: string;
    description: string;
  }) => {
    return (
      <>
        <div className="flex items-center w-[280px] flex-col justify-center gap-2 rounded-[8px] border-[2px] border-primary p-[21px]">
         <Image src={img} alt="feature-image" width={50} height={50}/>
          <div className="font-inter text-[18px] font-bold leading-[28px] text-secondary">
            {title}
          </div>
          <div className="font-inter text-[16px] text-center font-medium leading-[24px] text-[#434343]">
            {description}
          </div>
        </div>
      </>
    );
  };

  //whether the product is availble is not

  return (
    <>
      <div className="container mx-auto">
        <div className="pb-[55px] pt-[24px] xl:pt-[24px]  2xl:gap-[60px] 2xl:py-[32px]">
          <div className="mb-[24px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">Products</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>{productDetails.name}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row xl:gap-9 2xl:gap-[50px]">
            <div className="lg:basis-[503px] xl:basis-[612px] 2xl:basis-[728px]">
              <ProductImages productImages={productDetails.media} />
            </div>

            <div className="flex flex-col gap-[18px] lg:basis-[397px] xl:basis-[632px] xl:gap-6 2xl:basis-[942px] 2xl:gap-[28px]">
              {/* div-a */}
              <div className="flex flex-col gap-4">
                {/* 1 div-a */}
                <h2 className="font-poppins line-clamp-3 text-[28px] font-bold leading-9 md:text-4xl xl:text-[36px] xl:leading-[52px] 2xl:text-[55px] 2xl:leading-[68px]">
                  {productDetails.name}
                </h2>
                {/* 2 div-a */}
                <div className="flex justify-between border-b border-border-color pb-1">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2 border-r border-black pr-3 ">
                      <Rating
                        readOnly={true}
                        style={{ maxWidth: 95 }}
                        value={parseFloat(avgRating.toString())}
                        itemStyles={customStyles}
                      />
                      <span className="font-inter text-sm font-medium text-black-500 xl:text-base">
                        {avgRating}
                      </span>
                    </div>
                    <div className="font-inter text-sm font-normal text-black-500 xl:text-base">
                      {`${productReview.length || 0} reviews`}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <WishlistBtn product={productDetails} />
                    <ShareButton pathname={pathname} />
                  </div>
                </div>
                {/* 3-div-a */}
                <div className="text-justify font-inter text-sm font-normal text-black-500 md:text-base">
                  {productDetails.shortDescription}
                </div>
                {/* 4-div-a */}
                <div className="flex gap-6 border-b border-border-color pb-1">
                  <div className="flex items-center gap-3 pr-2 ">
                    <div className="font-inter text-base font-semibold text-secondary md:text-2xl 2xl:text-[28px] 2xl:leading-[38px]">
                      {`₹ ${((varients && calculateDiscountedPrice(varients.priceInCents, varients.discountInCents, varients.discountInPercentage, varients.discountEndDate)) || 0) / 100}`}
                    </div>
                    {varients &&
                      (varients.discountInCents ||
                        varients.discountInPercentage) && (
                        <div className="font-sans text-sm font-normal text-[#B8B8B8] line-through md:text-base xl:font-semibold">
                          {`₹ ${varients && varients.priceInCents / 100}`}
                        </div>
                      )}
                    <div className="font-inter text-sm font-semibold text-primary md:text-base">
                      {varients &&
                        getDiscountString(
                          varients.discountInCents,
                          varients.discountInPercentage,
                          varients.discountEndDate,
                        )}
                    </div>
                  </div>
                </div>
              </div>
              {/* div-b */}
              <div>
                {/* <div className="mb-2 font-inter text-base font-medium md:text-lg">
                  <svg
                    className="mr-[6px] inline"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.9348 17.0459H16.5687C16.441 17.0459 16.3374 16.9424 16.3374 16.8147C16.3375 16.6869 16.441 16.5833 16.5687 16.5833L17.9348 16.5833C18.262 16.5833 18.5275 16.3175 18.5275 15.9907C18.5276 15.6638 18.262 15.3979 17.9348 15.3979L16.5687 15.3979C16.441 15.3979 16.3374 15.2944 16.3374 15.1666C16.3375 15.0389 16.441 14.9354 16.5687 14.9354L17.9348 14.9353C18.5169 14.9353 18.9901 15.4087 18.9901 15.9907C18.9901 16.5725 18.5169 17.046 17.9348 17.0459Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.43118 17.0459H4.06511C3.48299 17.0459 3.00977 16.5725 3.00977 15.9907C3.00985 15.4087 3.48296 14.9354 4.06508 14.9354L5.43118 14.9353C5.5589 14.9353 5.66243 15.0389 5.66243 15.1666C5.66243 15.2944 5.55885 15.3979 5.43112 15.3979L4.06511 15.3979C3.73788 15.3979 3.47235 15.6638 3.47235 15.9907C3.47236 16.3174 3.73786 16.5833 4.06508 16.5833L5.43118 16.5833C5.5589 16.5833 5.66243 16.6869 5.66243 16.8147C5.66243 16.9424 5.55885 17.046 5.43118 17.0459Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.7649 6.6123C20.6969 6.6123 20.6295 6.58247 20.5837 6.52507L18.239 3.57976L14.3798 1.90218C14.2627 1.85129 14.2091 1.71506 14.2602 1.59793C14.3108 1.48065 14.4472 1.42706 14.5642 1.47799L18.4761 3.17851C18.5108 3.19357 18.5411 3.21698 18.5647 3.24656L20.9456 6.23695C21.0251 6.33686 21.0087 6.48238 20.9089 6.562C20.8662 6.59583 20.8155 6.61234 20.7649 6.6123ZM1.23502 6.6123C1.18439 6.6123 1.13378 6.59587 1.09088 6.562C0.9912 6.48241 0.974757 6.3369 1.05425 6.23697L3.43519 3.24654C3.45827 3.21698 3.48913 3.19361 3.5238 3.17853L7.43563 1.47795C7.55273 1.42715 7.68906 1.48073 7.73963 1.59793C7.79082 1.71505 7.73723 1.85129 7.62013 1.90222L3.76098 3.57976L1.4162 6.52507C1.37045 6.58243 1.3029 6.61234 1.23502 6.6123ZM16.5689 13.7211C16.4411 13.7211 16.3375 13.6175 16.3375 13.4897L16.3376 7.01724C16.3376 6.92189 16.3963 6.83633 16.485 6.80171C16.5742 6.76718 16.6748 6.79062 16.7394 6.86099L18.4384 8.71384C18.5247 8.80806 18.5184 8.9544 18.424 9.0407C18.33 9.12698 18.1835 9.12073 18.0973 9.02653L16.8001 7.61182V13.4897C16.8001 13.6174 16.697 13.7211 16.5689 13.7211ZM5.43106 17.046C5.3029 17.046 5.19972 16.9425 5.19972 16.8147L5.1998 7.61182L3.90256 9.02653C3.81637 9.12069 3.66981 9.12705 3.57583 9.04074C3.48146 8.95443 3.47513 8.80814 3.56138 8.71394L5.26052 6.86097C5.32502 6.7906 5.42571 6.76721 5.51486 6.80171C5.60356 6.8363 5.66231 6.92189 5.66231 7.01724V16.8147C5.66231 16.9424 5.55873 17.046 5.43106 17.046ZM16.5689 21.0786H5.43106C5.3029 21.0786 5.19972 20.975 5.19972 20.8474L5.1998 18.4916C5.1998 18.364 5.30285 18.2604 5.431 18.2604C5.55878 18.2604 5.66231 18.364 5.66231 18.4917V20.616H16.3376V15.1667C16.3376 15.039 16.4411 14.9354 16.5688 14.9354C16.697 14.9354 16.8001 15.039 16.8001 15.1667L16.8001 20.8473C16.8001 20.975 16.697 21.0786 16.5689 21.0786Z"
                      fill="#00898F"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.870275 6.81089L3.29704 9.22657L3.53306 8.9894L1.10642 6.57365L0.870275 6.81089ZM3.29704 9.69045C3.17993 9.69045 3.06229 9.64597 2.97312 9.55697L0.541231 7.13625C0.454503 7.0499 0.406253 6.93478 0.406253 6.812C0.40581 6.68918 0.453479 6.57385 0.539723 6.48702L0.780737 6.24483C0.959508 6.06544 1.25046 6.06481 1.4302 6.24334L3.86179 8.66397C3.94842 8.75045 3.99659 8.86564 3.99659 8.98837C3.9971 9.11111 3.94986 9.22656 3.86312 9.31335L3.6223 9.55542C3.53263 9.6454 3.415 9.69045 3.29704 9.69045Z"
                      fill="#00898F"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.9853 1.38428C7.97272 1.38428 7.95967 1.38533 7.94713 1.3874C7.82137 1.40785 7.73561 1.52694 7.75632 1.65291C8.03106 3.33052 9.33441 4.45779 11.0002 4.45779C12.6661 4.45775 13.9694 3.33052 14.2441 1.65266C14.2644 1.52696 14.1786 1.40787 14.0528 1.3874C13.9267 1.36677 13.808 1.45264 13.7873 1.5786C13.5512 3.02254 12.4309 3.99259 11.0002 3.99259C9.56963 3.99256 8.44925 3.02255 8.21266 1.5788C8.21266 1.57874 8.21266 1.57865 8.21266 1.57856C8.20301 1.51757 8.16976 1.4641 8.11964 1.42802C8.08016 1.39934 8.03293 1.38431 7.9853 1.38428ZM11.0003 4.92036C9.09931 4.92036 7.61226 3.63721 7.2995 1.7274C7.23841 1.34947 7.49565 0.99222 7.87293 0.93078C8.0561 0.901049 8.23963 0.94433 8.38999 1.05259C8.5404 1.16094 8.63958 1.32137 8.66945 1.50434C8.87096 2.73485 9.78593 3.53001 11.0002 3.53001C12.2145 3.53001 13.1296 2.73473 13.331 1.50405C13.3923 1.12656 13.7497 0.869242 14.127 0.93078C14.5049 0.992179 14.7621 1.34947 14.7009 1.72717C14.3882 3.63717 12.9007 4.92036 11.0003 4.92036Z"
                      fill="#00898F"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.9999 2.14185C10.1166 2.14185 9.23379 2.01568 8.37561 1.76333C8.2528 1.72725 8.18285 1.59872 8.21899 1.47619C8.25464 1.35364 8.38328 1.28345 8.50618 1.31953C10.1373 1.79913 11.8619 1.79913 13.4935 1.31953C13.6159 1.28344 13.7445 1.35365 13.7807 1.47619C13.8169 1.59871 13.7464 1.72729 13.624 1.76333C12.7654 2.01564 11.8826 2.14189 10.9999 2.14185Z"
                      fill="#00898F"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.5688 19.914H5.43061C5.30289 19.914 5.19922 19.8104 5.19922 19.6825C5.19925 19.5547 5.30283 19.4512 5.43053 19.4512H16.5688C16.6966 19.4512 16.8001 19.5547 16.8001 19.6825C16.8001 19.8103 16.6965 19.914 16.5688 19.914Z"
                      fill="#00898F"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.4673 8.9894L18.7033 9.22656L21.1301 6.81088L20.8939 6.57364L18.4673 8.9894ZM18.7033 9.69045C18.5853 9.69045 18.4677 9.64543 18.3781 9.55547L18.1372 9.31325C17.9584 9.13392 17.9588 8.84269 18.1386 8.66406L20.5701 6.24335C20.7493 6.06479 21.0408 6.06552 21.2191 6.24484L21.4606 6.48697C21.5468 6.57381 21.5945 6.6892 21.594 6.81199C21.5935 6.93474 21.5458 7.04993 21.4591 7.13633L19.0272 9.55692C18.938 9.64586 18.8204 9.69045 18.7033 9.69045Z"
                      fill="#00898F"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.7591 16.2219C18.6314 16.2219 18.5278 16.1183 18.5278 15.9906L18.5279 14.1835C18.5279 13.9284 18.3206 13.721 18.0651 13.721H11.415C11.3037 13.721 11.2126 13.8117 11.2126 13.9233V14.7329C11.2126 14.8445 11.3037 14.9353 11.415 14.9353L17.0378 14.9353C17.1659 14.9353 17.269 15.0389 17.269 15.1666C17.269 15.2943 17.1659 15.3979 17.0377 15.3979L11.415 15.3979C11.0488 15.3979 10.7505 15.0996 10.7505 14.7329L10.7505 13.9233C10.7505 13.5566 11.0487 13.2583 11.415 13.2583L18.0652 13.2583C18.5756 13.2583 18.9904 13.6734 18.9904 14.1836L18.9904 15.9906C18.9904 16.1183 18.8868 16.2219 18.7591 16.2219Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.8938 18.7228H3.935C3.68823 18.7228 3.45599 18.6265 3.28108 18.4514C3.10624 18.2765 3.00977 18.0443 3.00977 17.7977L3.00985 15.9906C3.00985 15.8629 3.1129 15.7593 3.24108 15.7593C3.36883 15.7592 3.47235 15.8629 3.47235 15.9906L3.47236 17.7976C3.47236 17.9207 3.52056 18.0368 3.60823 18.1244C3.69549 18.212 3.81161 18.2602 3.93496 18.2602H12.8938C13.0032 18.2602 13.0923 18.1695 13.0923 18.0579L13.0923 17.2483C13.0923 17.1366 13.0031 17.0459 12.8937 17.0459L4.96242 17.0459C4.83427 17.0459 4.7311 16.9424 4.7311 16.8146C4.73117 16.6869 4.83421 16.5833 4.96237 16.5833L12.8938 16.5833C13.2581 16.5833 13.5549 16.8816 13.5549 17.2483L13.5549 18.0578C13.5549 18.4246 13.258 18.7228 12.8938 18.7228Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.935 15.3977C17.8072 15.3977 17.7036 15.2942 17.7036 15.1665L17.7037 14.5555C17.7037 14.4277 17.8072 14.3242 17.9349 14.3242C18.0627 14.3242 18.1662 14.4278 18.1662 14.5555L18.1662 15.1664C18.1662 15.2942 18.0626 15.3978 17.935 15.3977Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.7763 15.3977C16.6485 15.3977 16.5449 15.2941 16.5449 15.1664L16.545 14.23C16.545 14.1024 16.6485 13.9988 16.7762 13.9988C16.904 13.9988 17.0075 14.1024 17.0075 14.2301V15.1664C17.0075 15.2941 16.9039 15.3977 16.7763 15.3977Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.617 15.3977C15.4893 15.3977 15.3857 15.2942 15.3857 15.1665L15.3858 14.5555C15.3858 14.4278 15.4893 14.3242 15.617 14.3242C15.7448 14.3242 15.8483 14.4278 15.8483 14.5555V15.1665C15.8483 15.2942 15.7447 15.3978 15.617 15.3977Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14.4584 15.3977C14.3306 15.3977 14.2271 15.2941 14.2271 15.1664L14.2271 14.23C14.2271 14.1024 14.3306 13.9988 14.4583 13.9988C14.5861 13.9988 14.6896 14.1024 14.6896 14.2301L14.6897 15.1664C14.6897 15.2941 14.586 15.3977 14.4584 15.3977Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M13.2997 15.3977C13.1721 15.3977 13.0684 15.2942 13.0684 15.1665L13.0684 14.5555C13.0684 14.4278 13.172 14.3242 13.2996 14.3242C13.4274 14.3242 13.531 14.4278 13.531 14.5555L13.531 15.1665C13.531 15.2942 13.4273 15.3978 13.2997 15.3977Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.1406 15.3977C12.0129 15.3977 11.9092 15.2941 11.9092 15.1664L11.9092 14.23C11.9092 14.1024 12.0128 13.9988 12.1405 13.9988C12.2682 13.9988 12.3718 14.1024 12.3718 14.2301L12.3718 15.1664C12.3718 15.2941 12.2682 15.3977 12.1406 15.3977Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.93495 18.7229C3.8068 18.7229 3.70361 18.6194 3.70361 18.4917L3.70368 17.8807C3.70368 17.753 3.80673 17.6494 3.93491 17.6494C4.06266 17.6494 4.16618 17.753 4.16618 17.8807L4.1662 18.4916C4.1662 18.6194 4.0626 18.723 3.93495 18.7229Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.09366 18.7229C4.96593 18.7229 4.8623 18.6193 4.8623 18.4916L4.8624 17.5552C4.8624 17.4275 4.96591 17.324 5.09359 17.324C5.22137 17.324 5.3249 17.4275 5.3249 17.5553L5.32491 18.4915C5.32491 18.6193 5.22131 18.7229 5.09366 18.7229Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6.25285 18.7229C6.12513 18.7229 6.02148 18.6194 6.02148 18.4917V17.8807C6.02148 17.753 6.1251 17.6494 6.2528 17.6494C6.38056 17.6494 6.48407 17.753 6.48407 17.8807L6.48409 18.4916C6.48409 18.6194 6.38047 18.723 6.25285 18.7229Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.41156 18.7229C7.28383 18.7229 7.18018 18.6193 7.18018 18.4916V17.5552C7.18018 17.4275 7.28378 17.324 7.41147 17.324C7.53916 17.324 7.64277 17.4275 7.64277 17.5553L7.6428 18.4915C7.6428 18.6193 7.53916 18.7229 7.41156 18.7229Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.57075 18.7229C8.44303 18.7229 8.33936 18.6194 8.33936 18.4917L8.33938 17.8807C8.33938 17.753 8.44296 17.6494 8.57067 17.6494C8.69835 17.6494 8.80195 17.753 8.80195 17.8807L8.80201 18.4916C8.80201 18.6194 8.69835 18.723 8.57075 18.7229Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.72941 18.7229C9.6017 18.7229 9.49805 18.6193 9.49805 18.4916L9.49806 17.5552C9.49806 17.4275 9.60163 17.324 9.72932 17.324C9.85703 17.324 9.9606 17.4275 9.9606 17.5553L9.96067 18.4915C9.96067 18.6193 9.857 18.7229 9.72941 18.7229Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.888 18.7229C10.7604 18.7229 10.6567 18.6194 10.6567 18.4917L10.6568 17.8807C10.6568 17.753 10.7603 17.6494 10.888 17.6494C11.0163 17.6494 11.1193 17.753 11.1193 17.8807L11.1194 18.4916C11.1194 18.6194 11.0162 18.723 10.888 18.7229Z"
                      fill="black"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.0478 18.7229C11.9196 18.7229 11.8164 18.6193 11.8164 18.4916V17.5552C11.8164 17.4275 11.9195 17.324 12.0477 17.324C12.1754 17.324 12.279 17.4275 12.279 17.5553L12.279 18.4915C12.279 18.6193 12.1754 18.7229 12.0478 18.7229Z"
                      fill="black"
                    />
                  </svg>
                  Size
                </div> */}
                <div className="flex flex-wrap gap-3">
                  {productDetails.productVariants.map((item, index) => {
                    return (
                      <>
                        <button
                          key={index}
                          onClick={() => setSelectedVarient(item.id)}
                          className={`${item.id === selectedVariant ? `bg-black text-white` : `text-black-500`} flex flex-col items-center justify-center gap-[2px] rounded-lg border border-black px-2 py-1 md:px-3 md:py-2`}
                        >
                          <div className="font-inter text-base font-medium  md:text-lg">
                            {item.name}
                          </div>
                        </button>
                      </>
                    );
                  })}
                </div>
              </div>
              {/* div-c */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                <div className="flex  items-center gap-6 rounded-md border border-primary p-[8px]">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <svg
                      width="12"
                      height="2"
                      viewBox="0 0 12 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.33398 1H10.6673"
                        stroke="#00898F"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="font-inter text-base font-semibold">
                    {quantity}
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.75 0C5.94891 0 6.13968 0.0790175 6.28033 0.21967C6.42098 0.360322 6.5 0.551088 6.5 0.75V5H10.75C10.9489 5 11.1397 5.07902 11.2803 5.21967C11.421 5.36032 11.5 5.55109 11.5 5.75C11.5 5.94891 11.421 6.13968 11.2803 6.28033C11.1397 6.42098 10.9489 6.5 10.75 6.5H6.5V10.75C6.5 10.9489 6.42098 11.1397 6.28033 11.2803C6.13968 11.421 5.94891 11.5 5.75 11.5C5.55109 11.5 5.36032 11.421 5.21967 11.2803C5.07902 11.1397 5 10.9489 5 10.75V6.5H0.75C0.551088 6.5 0.360322 6.42098 0.21967 6.28033C0.0790175 6.13968 0 5.94891 0 5.75C0 5.55109 0.0790175 5.36032 0.21967 5.21967C0.360322 5.07902 0.551088 5 0.75 5H5V0.75C5 0.551088 5.07902 0.360322 5.21967 0.21967C5.36032 0.0790175 5.55109 0 5.75 0Z"
                        fill="#00898F"
                      />
                    </svg>
                  </div>
                </div>
                {isProductAvailable ? (
                  <>
                    <Button
                      onClick={handleAddToCart}
                      className="shadow-[2px_2px_4px_0px_rgba(64, 64, 64, 0.25)] hover:bg-black w-[138px] bg-primary px-4 py-2 font-inter text-base font-medium text-white "
                    >
                      <svg
                        className="mr-1"
                        width="24"
                        height="19"
                        viewBox="0 0 24 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.7083 4.49994C23.4036 4.0553 22.9107 3.77749 22.3561 3.73793L4.10779 2.43465L3.70404 0.538116C3.63739 0.224944 3.34936 0 3.01501 0H0.703125C0.314758 0 0 0.300918 0 0.672207C0 1.0435 0.314758 1.34441 0.703125 1.34441H2.44061L4.85577 12.6909L4.30664 13.8226C4.05029 14.3507 4.09295 14.9591 4.42071 15.4499C4.54962 15.643 4.71478 15.8047 4.90429 15.9308C4.6485 16.2522 4.49615 16.6529 4.49615 17.087C4.49615 18.1419 5.39374 19 6.49713 19C7.60052 19 8.4981 18.1419 8.4981 17.087C8.4981 16.7805 8.42193 16.4906 8.28717 16.2336H15.0829C14.9484 16.4908 14.8722 16.7805 14.8722 17.087C14.8722 18.1419 15.7698 19 16.873 19C17.9764 19 18.8741 18.1419 18.8741 17.087C18.8741 16.7805 18.7978 16.4906 18.6632 16.2336H18.9444C19.3328 16.2336 19.6476 15.9325 19.6476 15.5614C19.6476 15.1901 19.3328 14.8892 18.9444 14.8892H5.91668C5.73431 14.8892 5.63855 14.7754 5.60595 14.7264C5.57318 14.6774 5.50561 14.5466 5.58233 14.3886L6.03991 13.4455H19.9151C20.6688 13.4455 21.342 12.9885 21.5905 12.3084L23.8995 5.98947C24.0828 5.48759 24.0132 4.94457 23.7083 4.49994ZM6.49713 17.6556C6.16919 17.6556 5.9024 17.4005 5.9024 17.087C5.9024 16.7735 6.16919 16.5183 6.49713 16.5183C6.82507 16.5183 7.09185 16.7735 7.09185 17.087C7.09185 17.4005 6.82507 17.6556 6.49713 17.6556ZM16.873 17.6556C16.545 17.6556 16.2783 17.4005 16.2783 17.087C16.2783 16.7735 16.545 16.5183 16.873 16.5183C17.2009 16.5183 17.4679 16.7735 17.4679 17.087C17.4679 17.4005 17.2009 17.6556 16.873 17.6556ZM22.5719 5.54606L20.263 11.865C20.2114 12.0062 20.0715 12.1011 19.9151 12.1011H6.16534L4.39911 3.80375L22.2513 5.07849C22.409 5.08987 22.495 5.18247 22.5322 5.23674C22.5694 5.291 22.6241 5.40339 22.5719 5.54606Z"
                          fill="#ffffff"
                        />
                      </svg>
                      Add to cart
                    </Button>

                    <Link href="/checkout">
                      <Button
                        onClick={handleBuyNow}
                        className="shadow-[2px_2px_4px_0px_rgba(64, 64, 64, 0.25)] border border-black bg-white  font-inter text-base font-medium text-inactive hover:bg-white "
                      >
                        Buy Now
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex w-fit justify-start ">
                      <button className="font-archivo flex cursor-auto items-center justify-center gap-3 rounded-lg border border-red-700 bg-transparent px-2 py-1 text-xs font-medium text-red-700 sm:px-2.5 sm:py-2 sm:text-sm  md:text-base lg:gap-4">
                        Out of stock
                      </button>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2 flex-col">
                {productDetails.productBenefits.map((item) => {
                  return(
                    <>
                    <div key={item.id}>
                      <span>-</span> {item.benefit}
                    </div>
                    </>
                  )
                })}
              </div>
              {/* div-d */}
              {/* <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="font-inter text-base font-semibold xl:text-lg">
                    Delivery & Services
                  </div>
                  <div className=" font-sans text-xs font-normal text-inactive xl:text-sm">
                    <svg
                      className="mr-1 inline"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_3598_87579)">
                        <path
                          d="M9.9987 14.1678C12.2999 14.1678 14.1654 12.3023 14.1654 10.0011C14.1654 7.69995 12.2999 5.83447 9.9987 5.83447C7.69751 5.83447 5.83203 7.69995 5.83203 10.0011C5.83203 12.3023 7.69751 14.1678 9.9987 14.1678Z"
                          fill="#00898F"
                        />
                        <path
                          d="M19.1667 9.16667H18.2908C17.8992 5.23583 14.7642 2.10083 10.8333 1.70917V0.833333C10.8333 0.373333 10.4608 0 10 0C9.53917 0 9.16667 0.373333 9.16667 0.833333V1.70917C5.23583 2.10083 2.10083 5.23583 1.70917 9.16667H0.833333C0.3725 9.16667 0 9.54 0 10C0 10.46 0.3725 10.8333 0.833333 10.8333H1.70917C2.10167 14.7642 5.23583 17.8992 9.16667 18.2908V19.1667C9.16667 19.6267 9.53917 20 10 20C10.4608 20 10.8333 19.6267 10.8333 19.1667V18.2908C14.7642 17.8983 17.8992 14.7642 18.2908 10.8333H19.1667C19.6275 10.8333 20 10.46 20 10C20 9.54 19.6275 9.16667 19.1667 9.16667ZM10.8217 16.6108C10.7917 16.1783 10.4408 15.8333 10 15.8333C9.55917 15.8333 9.20833 16.1783 9.17833 16.6108C6.16 16.2375 3.76333 13.8408 3.39 10.8225C3.8225 10.7917 4.16667 10.44 4.16667 10C4.16667 9.56 3.8225 9.20833 3.38917 9.17833C3.7625 6.16 6.15917 3.76333 9.1775 3.39C9.20833 3.82167 9.55917 4.16667 10 4.16667C10.4408 4.16667 10.7917 3.82167 10.8217 3.38917C13.84 3.7625 16.2367 6.15917 16.61 9.1775C16.1775 9.20833 15.8333 9.56 15.8333 10C15.8333 10.44 16.1775 10.7917 16.6108 10.8217C16.2367 13.8408 13.8408 16.2367 10.8217 16.6108Z"
                          fill="#00898F"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3598_87579">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    Use my location
                  </div>
                </div>
                <div className="relative">
                  <input
                    className="w-full rounded border-[1.8px] border-primary px-8 py-[10px] font-inter text-xs font-normal"
                    type="text"
                    placeholder="Enter Pincode"
                  />
                  <svg
                    className="absolute left-2 top-[14px]"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_3598_87585)">
                      <path
                        d="M5.01912 15.3679C6.08962 15.6703 7.50357 15.8368 9.00049 15.8368C10.4974 15.8368 11.9114 15.6703 12.9819 15.3679C14.2915 14.9979 14.9556 14.4623 14.9556 13.7762C14.9556 13.0899 14.2915 12.5544 12.9819 12.1845C12.3834 12.0154 11.6773 11.8891 10.9096 11.8103C12.4129 9.24437 13.9027 6.33902 13.9027 4.90215C13.9027 2.19909 11.7036 0 9.00049 0C6.2974 0 4.0983 2.19909 4.0983 4.90215C4.0983 6.33899 5.58802 9.24427 7.09133 11.8102C6.32366 11.889 5.61765 12.0154 5.01915 12.1845C3.70948 12.5544 3.04541 13.09 3.04541 13.7762C3.04538 14.4623 3.70944 14.9979 5.01912 15.3679ZM9.00049 1.05469C11.122 1.05469 12.848 2.78065 12.848 4.90215C12.848 5.99186 11.4997 8.84837 9.24131 12.5434C9.16671 12.6654 9.04802 12.6786 9.00046 12.6786C8.95293 12.6786 8.8342 12.6654 8.7596 12.5434C6.50123 8.84837 5.15292 5.99189 5.15292 4.90215C5.15299 2.78065 6.87895 1.05469 9.00049 1.05469ZM5.49735 13.148C6.12612 12.9879 6.87948 12.8755 7.69156 12.817C7.74791 12.91 7.80398 13.0022 7.85971 13.0933C8.10461 13.494 8.53105 13.7332 9.00046 13.7332C9.4699 13.7332 9.89631 13.494 10.1412 13.0933C10.1969 13.0021 10.253 12.9099 10.3094 12.817C11.1215 12.8754 11.8748 12.9879 12.5036 13.148C13.4674 13.3935 13.8196 13.6699 13.892 13.7761C13.8195 13.8824 13.4675 14.1588 12.5036 14.4042C11.5469 14.6479 10.3028 14.7821 9.00046 14.7821C7.69813 14.7821 6.45398 14.6479 5.49731 14.4042C4.53347 14.1588 4.18138 13.8824 4.10899 13.7761C4.18141 13.6699 4.5335 13.3935 5.49735 13.148Z"
                        fill="#00898F"
                        fill-opacity="0.7"
                      />
                      <path
                        d="M16.4647 12.6202C16.2094 12.48 15.8888 12.5732 15.7486 12.8285C15.6084 13.0838 15.7016 13.4044 15.9569 13.5446C16.585 13.8897 16.9453 14.2722 16.9453 14.5942C16.9453 14.988 16.3874 15.5983 14.8214 16.1303C13.2744 16.656 11.2069 16.9454 9 16.9454C6.79307 16.9454 4.72563 16.656 3.17858 16.1303C1.61262 15.5983 1.05469 14.988 1.05469 14.5942C1.05469 14.2722 1.41497 13.8897 2.04314 13.5445C2.29841 13.4043 2.39164 13.0837 2.25141 12.8284C2.11117 12.5732 1.79065 12.4799 1.53531 12.6202C0.834926 13.005 0 13.6598 0 14.5942C0 15.3105 0.492609 16.3317 2.83929 17.129C4.49276 17.6907 6.68067 18.0001 9 18.0001C11.3193 18.0001 13.5072 17.6907 15.1607 17.129C17.5074 16.3317 18 15.3105 18 14.5942C18 13.6598 17.1651 13.005 16.4647 12.6202Z"
                        fill="#00898F"
                        fill-opacity="0.7"
                      />
                      <path
                        d="M10.9721 4.56555C10.9721 3.47911 10.0881 2.59521 9.00165 2.59521C7.91518 2.59521 7.03125 3.47911 7.03125 4.56555C7.03125 5.65202 7.91518 6.53591 9.00165 6.53591C10.0881 6.53591 10.9721 5.65205 10.9721 4.56555ZM8.08594 4.56555C8.08594 4.06067 8.49674 3.6499 9.00165 3.6499C9.50657 3.6499 9.91737 4.06067 9.91737 4.56555C9.91737 5.07043 9.50657 5.48123 9.00165 5.48123C8.49674 5.48123 8.08594 5.07046 8.08594 4.56555Z"
                        fill="#00898F"
                        fill-opacity="0.7"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3598_87585">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="absolute right-2 top-[12px] font-inter text-sm font-normal text-primary">
                    Check
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {features.map((item, index) => {
            return(
              <>
              <Features img={item.img!} title={item.title} description={item.description}/>
              </>
            )
          })}
        </div>
        <div className="md:px-4 md:py-[18px] xl:p-6 ">
          <div className=" flex flex-col gap-[30px] p-6 md:rounded-[5px] md:border md:border-border-color">
            {/* DEsc- rev -faq */}
            <ProductDescRevFaq
              productDescription={productDetails.description}
              productReview={productReview}
              productFAQ={productDetails.faq}
            />

            {/* Description */}
            {/* <ProductDescription
              description={productDetails.description}
              // description={
              //   <Description description={ProductDetails.description} />
            /> */}
            {/* Reviews */}
            {/* <ProductReview productReview={productReview} /> */}

            {/* FAQ */}
            {/* <ProductFAQ /> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
