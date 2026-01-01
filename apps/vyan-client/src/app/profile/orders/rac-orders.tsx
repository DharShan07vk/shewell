
import { IOrderDetail } from "~/models/order.model";
import OrderedProductCard from "./ordered-product-card";
import RelatedOrderCard from "./related-order-card";
import { IReview } from "~/models/review.model";

const RacOrders = ({
  racOrders,
  reviews
}: {
  racOrders: IOrderDetail;
  reviews:IReview[]
}) => {
  return (
    <>
     
     <div className="mt-4">
            <OrderedProductCard
              key={racOrders.id}
              order={racOrders}
            />
        <RelatedOrderCard order={racOrders} reviews={reviews}/>
        </div>
   
    </>
  );
};

export default RacOrders;
