import { IOrderDetail } from "~/models/order.model";
import { IReview } from "~/models/review.model";
import OrderedProductCard from "./ordered-product-card";
import RelatedOrderCard from "./related-order-card";

const DeliveredOrders = ({
  deliveredOrders,
  reviews,
}: {
  deliveredOrders: IOrderDetail;
  reviews: IReview[];
}) => {
  return (
    <>
      <div className="mt-4">
        <OrderedProductCard key={deliveredOrders.id} order={deliveredOrders} />
        <RelatedOrderCard order={deliveredOrders} reviews={reviews} />
      </div>
    </>
  );
};

export default DeliveredOrders;
