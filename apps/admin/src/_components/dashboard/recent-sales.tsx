// import { Dropdown } from 'primereact/dropdown';
// import { DataTable } from 'primereact/datatable';
// import { useEffect, useState } from 'react';
// import { Demo } from '@/types';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { ProductService } from '../../demo/service/ProductService';

// const RecentSales = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [products, setProducts] = useState<Demo.Product[]>([]);
//   const categories = [{ name: 'Membership' }, { name: 'Book Slots' }, { name: 'Products' }];

//   useEffect(() => {
//     ProductService.getProductsSmall().then((data) => setProducts(data));
//   }, []);

//   const formatCurrency = (value: number) => {
//     return value?.toLocaleString('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     });
//   };
//   return (
//     <div className="card">
//       <div className="flex justify-content-between align-items-center">
//         <h5>Recent Sales</h5>
//         <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={categories} optionLabel="name"  placeholder="Select Category" className="w-max mb-4" />
//       </div>

//       <DataTable stripedRows value={products} rows={5} paginator scrollable scrollHeight="500px">
//         <Column header="Image" body={(data) => <img className="shadow-2" src={`/demo/images/product/${data.image}`} alt={data.image} width="50" />} />
//         <Column field="name" header="Name" sortable style={{ width: '35%' }} />
//         <Column field="price" header="Price" sortable style={{ width: '35%' }} body={(data) => formatCurrency(data.price)} />
//         <Column
//           header="View"
//           style={{ width: '15%' }}
//           body={() => (
//             <>
//               <Button icon="pi pi-search" text />
//             </>
//           )}
//         />
//       </DataTable>
//     </div>
//   );
// };

// export default RecentSales;


'use client';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { Demo } from '@/types';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProductService } from '../../demo/service/ProductService';
import { IActiveLineItem, IOrderDetail } from '@/src/app/(main)/manage-products/orders/orders-table';
// import { IOrderDetail } from '@/src/app/(main)/manage-products/orders/orders-table';
import OrderDialog from '@/src/app/(main)/manage-products/orders/order-dialog';
import { apiClient } from '@/src/trpc/react';
import { useSearchParams } from 'next/navigation';
// import OrderTable from '@/src/app/(main)/manage-products/orders/orders-table';
type IUser = {
  id: string;
  name: string | null;
  email: string;
};
type IRecentSales = {
  orders: IOrderDetail[];
  users: IUser[];
};
const RecentSales = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentLineItems, setCurrentLineItems] = useState<IActiveLineItem[]>([]);
  const [currentOrderInfo, setCurrentOrderInfo] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    setStartDate(searchParams.get('startDate') ?? '');
    setEndDate(searchParams.get('endDate') ?? '');
  }, [searchParams]);
  const { data } = apiClient.noOfOnlineAppointments.noOfOnlineAppointments.useQuery({
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  });
  const productImage = (rowData: IOrderDetail) => {
    return (
      <>
        <img className="shadow-2" src={rowData.lineItems[0].productVariant.product?.media[0]?.media?.fileUrl || '/not-available.jpg'} alt="image" width="50" />
      </>
    );
  };
  const userDetail = (rowData: IOrderDetail) => {
    const user = data?.users.find((i) => i.id === rowData.userId);
    console.log('user is ', user);
    return (
      <>
        <div>{user?.name}</div>
      </>
    );
  };
  const totalInCent = (rowData: IOrderDetail) => {
    return <>{`₹${rowData.totalInCent}`}</>;
  };
  const showLineItemsDialog = (order: IOrderDetail) => {
    const orderInfo = [
      `SubTotal: Rs. ${order.subTotalInCent}`,
      `Taxes: Rs. ${order.taxesInCent}`,
      `Delivery Fees: Rs. ${order.deliveryFeesInCent}`,
      `Total: Rs. ${order.totalInCent}`,
      `Address: ${order.address.name}, ${order.address.houseNo}, ${order.address.area}, ${order.address.city}, ${order.address.pincode}`,
      `Coupon discount: - Rs. ${order.discountInCent || 0}`
    ];
    setCurrentOrderInfo(orderInfo);
    setVisible(true);
    setCurrentLineItems(order.lineItems);
  };
  const actionBodyTemplate = (rowData: IOrderDetail) => {
    return (
      <>
        <Button icon="pi pi-folder-open" onClick={() => showLineItemsDialog(rowData)} text />
      </>
    );
  };
  return (
    <div className="card">
      <div className="flex justify-content-between align-items-center">
        <h5>Recent Sales</h5>
      </div>

      <DataTable stripedRows value={data?.orders} rows={5} paginator scrollable scrollHeight="500px">
        <Column header="Image" body={productImage} />
        <Column header="Username" body={userDetail} sortable style={{ width: '35%' }} />
        <Column header="Price" field="totalInCent" body={totalInCent} sortable style={{ width: '35%' }} />
        <Column header="LineItems" style={{ width: '15%' }} body={actionBodyTemplate} />
      </DataTable>
      <OrderDialog visible={visible} currentLineItems={currentLineItems} onHide={() => setVisible(false)} currentOrderInfo={currentOrderInfo} />
    </div>
  );
};

export default RecentSales;
