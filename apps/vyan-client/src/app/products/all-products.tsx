// "use client";
// import ProductCard from "~/components/product-card";
// import { IProduct } from "~/models/product-model";
// import { api } from "~/trpc/react";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const AllProducts = ({ product }: { product: IProduct[] }) => {
//   const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
//   const searchParams = useSearchParams();
//   const categoryId = searchParams.get("category") as string;
//   const maxPrice = searchParams.get("maxValue") as string;
//   const minPrice = searchParams.get("minValue") as string;
//   // const sortBy = searchParams.get("sortBy") as string;

//   //   const productIdString = searchParams?.category;
//   //   const productId = productIdString?.split(",") || [];
//   //   console.log("productIdsss", productId);

//   //   const { isLoading, data: products } = api.products.filterProducts.useQuery({
//   //     categoryId: ids.length > 0 ? ids?.map((id) => id) : [],
//   //   });

//   const { isLoading, data: products } = api.products.filterProducts.useQuery({
//     categoryId: categoryId?.split(",") || [],
//     minPrice: parseInt(minPrice),
//     maxPrice: parseInt(maxPrice),
//     // sortBy: sortBy,
//   });
//   // console.log("filters products", categoryId);
//   const formattedFilteredProducts = products?.filteredProducts.map((item) => ({
//     ...item  }));
//   useEffect(() => {
//     if (products) {
//       setFilteredProducts(formattedFilteredProducts!);
//     }
//   }, [products]);

//   console.log("filtererd prpducts are",filteredProducts);
//   console.log("categoryId", categoryId);
//   return (
//     <>
//       {filteredProducts?.map((item, index) => {
//         return (
//           <>
//             <ProductCard
//               key={index}
//               productCard={{
//                 ...item,
//               }}
//             />
//           </>
//         );
//       })}
//     </>
//   );
// };

// export default AllProducts;


"use client";
import ProductCard from "~/components/product-card";
import { IProduct } from "~/models/product-model";
import { api } from "~/trpc/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AllProducts = ({ product }: { product: IProduct[] }) => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");
  const maxPrice = searchParams.get("maxValue");
  const minPrice = searchParams.get("minValue");
  // const sortBy = searchParams.get("sortBy");

  const { isLoading, data: products } = api.products.filterProducts.useQuery({
    categoryId: categoryId ? categoryId.split(",") : [], // Empty array if no category selected
    minPrice: minPrice ? parseInt(minPrice) : undefined, // undefined if no min price
    maxPrice: maxPrice ? parseInt(maxPrice) : undefined, // undefined if no max price
    // sortBy: sortBy || undefined,
  }, {
    // This ensures the query runs immediately without waiting for filters
    enabled: true
  });

  useEffect(() => {
    if (products) {
      setFilteredProducts(products.updatedFilteredProducts.map((item:any) => ({
        ...item,
        
      })));
    }
  }, [products]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  
  return (
    <>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item : any, index : any ) => (
          <ProductCard
            key={item.id} 
            productCard={{
              ...item,
            }}
          />
        ))
      ) : (
        <div>No products found</div>
      )}
    </>
  );
};

export default AllProducts;