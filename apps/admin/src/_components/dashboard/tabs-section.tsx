// import { TabView, TabPanel } from 'primereact/tabview';
// import { Dropdown } from 'primereact/dropdown';
// import { useState } from 'react';

// import BestSellingProductsTabs from './best-selling-products-tab';
// import HotDealsTab from './hot-deals-tab';
// import NewArrivalTab from './new-arrival-tab';
// // import './TabViewDemo.css';

// const TabsSection = () => {
//   const [selectedCategory, setSelectedCategory] = useState('products');
//   const categories = [{ name: 'Membership' }, { name: 'Book Slots' }, { name: 'Products' }];

//   return (
//     <div className="card">
//       <div className="flex flex-column">
//         <div className='align-self-end'>
//         <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={categories} optionLabel="name" placeholder='Products' defaultValue={'Products'} className="w-10rem mt-2" />
//         </div>
//         <TabView >
//           <TabPanel header="Best selling Products">
//             <BestSellingProductsTabs/>
//           </TabPanel>
//           <TabPanel header="Hot Deals">
//             <HotDealsTab/>
//           </TabPanel>
//           <TabPanel header="New Arrivals">
//             <NewArrivalTab/>
//           </TabPanel>
//         </TabView>
//       </div>
//     </div>
//   );
// };

// export default TabsSection;

'use client';
import { calculateDiscountedPrice } from "@/src/lib/discountedPrice";

type ITabsSection = {
  mostSoldProductVariant: {
    _sum: {
      quantity: number | null;
    };
    productVariantId: string;
  }[];
  bestSellingProducts: {
    id: string;
    name: string;
    priceInCents: number;
    discountInCents: number | null;
    discountInPercentage: number | null;
    product: {
      id: string;
      name: string;
      category: {
        id: string;
        name: string;
      };
    }|null;
  }[];
};
const TabsSection = ({ mostSoldProductVariant, bestSellingProducts }: ITabsSection) => {
  const mostSoldProducts = mostSoldProductVariant.map((i) => {
    const filtered = bestSellingProducts.find((p) => p.id === i.productVariantId);
    return { ...i, filtered };
  });
  return (
    <div className="card">
      <div className="flex justify-content-between align-items-center">
        <h5>Best Selling Products</h5>
      </div>
      {mostSoldProducts.map((b) => (
        <>
          <ul className="list-none p-0 m-0">
            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
              <div>
                <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                  {b.filtered?.product?.name}
                  <span className="text-500 font-base">({b.filtered?.name})</span>
                </span>
                <div className="mt-1 text-600">{b.filtered?.product?.category.name}</div>
                <div className="text-500  font-medium">Price : ₹ {b.filtered && calculateDiscountedPrice(b.filtered.priceInCents, b.filtered.discountInCents, b.filtered.discountInPercentage)}</div>
              </div>
              <div className="mt-2 md:mt-0 flex align-items-center">
                <span className="text-black-500 ml-3 font-medium">{b._sum.quantity} items</span>
              </div>
            </li>
          </ul>
        </>
      ))}
    </div>
  );
};

export default TabsSection;
