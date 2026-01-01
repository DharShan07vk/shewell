import { IOrderDetail } from "~/models/order.model";
import { IReview } from "~/models/review.model";
import OrderedProductCard from "./ordered-product-card";
import RelatedOrderCard from "./related-order-card";


const ActiveOrders = ({ activeOrders,reviews }: { activeOrders: IOrderDetail,reviews:IReview[] }) => {
  return (
      <>
     <div className="mt-4">
     <OrderedProductCard key={activeOrders.id} order={activeOrders} />
     <RelatedOrderCard order={activeOrders} reviews={reviews}/>
      </div>
      </>
   
  )
};

export default ActiveOrders;
