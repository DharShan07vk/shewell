import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { format } from "date-fns";
import { IReview } from "~/models/review.model";
interface IProductReviews {
  productReview: IReview[]
}
const ProductReviewCard = ({ productReview }: IProductReviews) => {
  const StarDrawing = (
    <path d="M15.1533 1.24496C14.6395 0.359428 13.3607 0.359425 12.8468 1.24496L9.2281 7.48137C8.97427 7.91882 8.53553 8.21734 8.03545 8.29287L1.2537 9.31717C0.114654 9.48921 -0.284892 10.9274 0.602182 11.6623L5.6543 15.8479C6.12196 16.2354 6.34185 16.8465 6.22825 17.4431L4.90669 24.3833C4.69778 25.4804 5.8495 26.3328 6.8377 25.8125L13.2236 22.4501C13.7096 22.1941 14.2905 22.1941 14.7766 22.4501L21.1625 25.8125C22.1507 26.3328 23.3024 25.4804 23.0935 24.3833L21.7719 17.4431C21.6583 16.8465 21.8782 16.2354 22.3459 15.8479L27.398 11.6623C28.285 10.9274 27.8855 9.48921 26.7465 9.31717L19.9647 8.29287C19.4646 8.21734 19.0259 7.91882 18.7721 7.48137L15.1533 1.24496Z" />
  );
  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: "#00898F",
  };

 
  return (
    <>
      {productReview &&
        productReview.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-[18px] rounded-xl border p-[18px] xl:p-6"
            >
              <div className="flex items-center gap-4 ">
                <div className="flex items-center gap-4 border-r border-primary pr-2">
                  <Rating
                    readOnly={true}
                    style={{ maxWidth: 95 }}
                    value={Number(item.rating)}
                    itemStyles={customStyles}
                  />
                  <span className=" font-inter text-base font-medium">
                    {item.rating}
                  </span>
                </div>
                <div className="font-inter text-sm font-normal text-[#949494]">
                  {" "}
                  Posted on {format(new Date(item.createdAt),'MMMM dd , yyyy')}
                </div>
              </div>
              <div className="font-inter text-lg font-medium">
               {item.user.name}
                {item.approved ? (
                  <svg
                    className="ml-2 inline"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
                      fill="#008F4E"
                      stroke="#008F4E"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </div>
              <div className="font-inter text-sm font-normal text-inactive xl:text-base">
                {item.review}
              </div>
            </div>
          );
        })}
    </>
  );
};
export default ProductReviewCard;
