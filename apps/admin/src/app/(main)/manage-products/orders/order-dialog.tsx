import { Dialog } from 'primereact/dialog';
import Image from 'next/image';
import { IActiveLineItem } from './orders-table';
type IOrderDialog = {
  visible: boolean;
  currentOrderInfo: string[];
  currentLineItems: IActiveLineItem[];
  onHide: () => void;
};
const OrderDialog = ({ visible, currentOrderInfo, currentLineItems, onHide }: IOrderDialog) => {
  return (
    <>
      <Dialog header="Line Items under this order" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
        {currentLineItems.map((item, index) => (
          <div className="mb-3" key={item.id}>
            <div className="font-semibold text-lg text-teal-600 mb-2">{`LineItem ${index + 1}`}</div>
            <div className="flex flex-row gap-4 align-items-start">
              <div className="relative w-9rem h-9rem">
                <Image src={item.productVariant.product?.media[0]?.media.fileUrl || '/not-available.jpg'} alt="product-img" fill={true} />
              </div>
              <div className="flex flex-column gap-2">
                <div>{`Item name : ${item.productVariant.product?.name}`}</div>
                <div>{`Actual item price : Rs. ${(item.subTotalInCent / item.quantity)/100}`}</div>
                <div>{`Discount: Rs. ${item.discountInCent/100}`}</div>
                <div>{`Final price of item : Rs. ${(item.totalInCent / item.quantity)/100}`}</div>
                <div>{`Quantity : ${item.quantity}`}</div>
                <div className="font-semibold text-blue-700">
                  Total :<span> Rs. {item.totalInCent/100}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-column gap-1">
          <div>{currentOrderInfo[4]}</div>
          <div>{currentOrderInfo[0]}</div>
          <div>{currentOrderInfo[1]}</div>
          <div>{currentOrderInfo[2]}</div>
          <div>{currentOrderInfo[5]}</div>
          <div className="font-semibold text-blue-700 text-lg">{currentOrderInfo[3]}</div>
        </div>
      </Dialog>
    </>
  );
};

export default OrderDialog;
