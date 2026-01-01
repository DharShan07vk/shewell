'use client';

import { IProduct } from '@/src/_models/product.model';
import { OrderStatus } from '@repo/database';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ChangeEvent, useState } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Image from 'next/image';
import { IOrder } from '@/src/_models/order.model';
import OrderDialog from './order-dialog';
import ShipRocketForm from './shipRocket-form';
type IProductVariant = {
  id: string | null;
  product: {
    id: string;
    name: string;
    media: {
      mediaId: string;
      imageAltText: string | null;
      comment: string | null;
      media: {
        id: string;
        fileKey: string;
        fileUrl: string | null;
      };
    }[];
  };
  productId: string;
  name: string;
  priceInCents: number;
  isPercentage?: boolean | null;
  discountInCents: number | null;
  discountInPercentage: number | null;
  discountEndDate: Date | null;
};
export type IActiveLineItem = {
  id: string;
  orderId: string;
  productVariantId: string;
  perUnitPriceInCent: number;
  quantity: number;
  subTotalInCent: number;
  discountInCent: number;
  totalInCent: number;
  productVariant: {
    id: string;
    name: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    discountEndDate:Date | null;
    priceInCents:number;
    discountInCents:number | null;
    discountInPercentage:number | null;
    product: {
      id: string;
      name: string;
      media: {
        media: {
          id: string;
          fileKey: string;
          fileUrl: string | null;
        };
      }[];
    } | null;
  };
};
type IActiveAddress = {
  id: string;
  name: string;
  mobile: string;
  houseNo: string;
  area: string;
  city: string;
  countryId: string;
  stateId: string;
  landmark: string;
  pincode: string;
  addressType: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  userId: string;
};
export type IOrderDetail = {
  id: string;
  userId: string;
  status: OrderStatus;
  subTotalInCent: number;
  taxesInCent: number;
  discountInCent: number | null;
  deliveryFeesInCent: number;
  totalInCent: number;
  couponId: string | null;
  addressId: string;
  expectedDelivery: Date | null;
  orderPlaced: Date | null;
  cancelledDate: Date | null;
  lineItems: IActiveLineItem[];
  address: IActiveAddress;
  shiprocket_order_id: string | null;
};
export type IShipRocket = {
  length: number;
  breadth: number;
  height: number;
  weight: number;
};
const OrderTable = ({ orders }: { orders: IOrderDetail[] }) => {
  const emptyForm: IShipRocket = {
    length: 0,
    breadth: 0,
    height: 0,
    weight: 0
  };
  const [globalFilter, setGlobalFilter] = useState('');
  const [showShipRocketDialog, setShowShipRocketDialog] = useState<boolean>(false);
  const [shippingData, setShippingData] = useState<IShipRocket>(emptyForm);
  const [orderId, setOrderId] = useState<string>('');
  const [currentLineItems, setCurrentLineItem] = useState<IActiveLineItem[]>([]);
  const [currentOrderInfo, setCurrentOrderInfo] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS }
  });
  const getSeverity = (status: string) => {
    switch (status) {
      case OrderStatus.CANCELLED:
        return 'danger';

      case OrderStatus.DELIVERED:
        return 'success';

      case OrderStatus.OUT_FOR_DELIVERY:
        return 'info';

      case OrderStatus.PAYMMENT_FAILED:
        return 'warning';

      case OrderStatus.PAYMENT_PENDING:
        return 'warning';

      case OrderStatus.PAYMENT_SUCCESSFUL:
        return 'success';

      case OrderStatus.RETURNED:
        return 'danger';
    }
  };
  const onGlobalFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters: any = { ...filters };

    _filters.global.value = value;

    setFilters(_filters);
    setGlobalFilter(value);
  };
  const handleClickOnShipRocketBtn = (orderId: string) => {
    console.log("clicked on shiprocket btn");
    setShowShipRocketDialog(true);
    setShippingData({ ...emptyForm });
    setOrderId(orderId);
  };
  const showLineItemDialog = (order: IOrderDetail) => {
    const orderInfo = [
      `SubTotal: Rs. ${order.subTotalInCent/100}`,
      `Taxes: Rs. ${order.taxesInCent/100}`,
      `Delivery Fees: Rs. ${order.deliveryFeesInCent/100}`,
      `Total: Rs. ${order.totalInCent/100}`,
      `Address: ${order.address.name}, ${order.address.houseNo}, ${order.address.area}, ${order.address.city}, ${order.address.pincode}`,
      `Coupon discount: - Rs. ${(order.discountInCent || 0)/100}`
    ];
    setVisible(true);
    setCurrentLineItem(order.lineItems);
    setCurrentOrderInfo(orderInfo);
  };
  const statusBodyTemplate = (rowData: IOrderDetail) => {
    return (
      <>
        <Tag value={rowData.status} severity={getSeverity(rowData.status)} />
      </>
    );
  };
  const actionBodyTemplate = (rowData: IOrderDetail) => {
    return (
      <>
              <div className="flex flex-row gap-2">
        <Button label="LineItem" className="" severity="success" onClick={() => showLineItemDialog(rowData)}></Button>
        {rowData.status === 'PAYMENT_SUCCESSFUL' &&  !rowData.shiprocket_order_id && (
            <Button onClick={() => handleClickOnShipRocketBtn(rowData.id)} className="" severity="success">
              Move to ShipRocket
            </Button>
          )}
          </div>
      </>
    );
  };
  const subTotalBodyTemplate = (rowData: IOrderDetail) => {
    return (
      <>
        <span className="p-column-title">SubTotalInCent</span>
        {rowData.subTotalInCent / 100}
      </>
    );
  };

  const totalInCentBodyTemplate = (rowData: IOrderDetail) => {
    return (
      <>
        <span className="p-column-title">TotalInCent</span>
        {rowData.totalInCent / 100}
      </>
    );
  };
  const hideDialog = () => {
    setVisible(false);
    setShowShipRocketDialog(false);
  };
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Orders</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" value={globalFilter} onChange={onGlobalFilterChange} placeholder="Search..." />
      </span>
    </div>
  );
  console.log('orders are finallyyy', orders);
  return (
    <>
      <DataTable
        stripedRows
        value={orders}
        header={header}
        filters={filters}
        globalFilterFields={['id', 'status']}
        emptyMessage="No orders found"
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        paginator
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        className="datatable-responsive"
      >
        <Column field="id" header="id"></Column>
        <Column field="status" body={statusBodyTemplate} header="Status" headerStyle={{ minWidth: '15rem' }}></Column>
        <Column field="subTotalInCent" header="SubTotal" body={subTotalBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
        <Column field="totalInCent" header="totalInCent" body={totalInCentBodyTemplate} sortable headerStyle={{ minWidth: '15rem' }}></Column>
        <Column field="taxesInCent" header="Taxes" headerStyle={{ minWidth: '15rem' }}></Column>
        <Column field="deliveryFeesInCent" header="DeliveryFees" headerStyle={{ minWidth: '15rem' }}></Column>
        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '25rem' }}></Column>
      </DataTable>

      <OrderDialog currentLineItems={currentLineItems} currentOrderInfo={currentOrderInfo} visible={visible} onHide={hideDialog} />
      <ShipRocketForm orderId={orderId} shippingData={shippingData} showShipRocketDialog={showShipRocketDialog} onHide={hideDialog} />

    </>
  );
};

export default OrderTable;
