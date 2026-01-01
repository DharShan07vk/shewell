import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/src/@/components/select";
import { Button } from "@repo/ui/src/@/components/button";
import ProductReviewCard from "~/components/product-review-card";
import { IReview } from "~/models/review.model";
interface IProductReviews {
  productReview: IReview[];
}
const ProductReview = ({ productReview }: IProductReviews) => {
  return (
    <>
      {productReview.length > 0 ? (
        <div>
          <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <h3 className="font-inter text-[20px] font-medium leading-[30px] xl:text-[24px] ">
              All Reviews{" "}
              {/* <span className="ml-4 text-base font-normal text-inactive  ">
            (451)
          </span> */}
            </h3>
            {/* <div className="flex items-center gap-[10px] self-end">
          <div>
            <Select>
              <SelectTrigger
                className="shadow-[2px_2px_4px_0px_rgba(64, 64, 64, 0.25)] w-[104px] rounded-md border
border-black"
              >
                <SelectValue
                  className="placeholder:text-inactive"
                  placeholder="Latest"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button>Write a Review</Button>
          </div>
        </div> */}
          </div>
          <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <ProductReviewCard productReview={productReview} />
          </div>
        </div>
      ) : (
        <div>No Reviews found for this project</div>
      )}
    </>
  );
};
export default ProductReview;
