import { Button } from "@repo/ui/src/@/components/button";
import { ICartLineItem } from "~/models/cart.model";
import { useCartStore } from "~/store/cart.store";
const CountUpdate = ({ item }: { item: ICartLineItem }) => {
  const chosenVarinat = item.product.productVariants.find(
    (i) => i.id === item.productVariantId,
  );

  const { addToCart, decrementFromCart } = useCartStore((state) => {
    return {
      addToCart: state.addToCart,
      decrementFromCart: state.decrementFromCart,
    };
  });

  const handleCartDecrement = () => {
    decrementFromCart(item.product, chosenVarinat!);
  };

  const handleCartIncrement = () => {
    addToCart(item.product, 1, chosenVarinat!);
  };
  return (
    <>
      <div className="my-[12px] flex w-[137px] items-center rounded-md border border-border-color md:mt-5">
        <Button
          onClick={handleCartDecrement}
          className="bg-white hover:bg-white "
        >
          <svg
            width="12"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33398 1H10.6673"
              stroke="#00898F"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
        <div className="rounded-[3px] border px-[18px] py-[10px] font-inter text-base font-semibold">
          {item.quantity}
        </div>
        <Button
          onClick={handleCartIncrement}
          className="bg-white hover:bg-white "
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.75 0C5.94891 0 6.13968 0.0790175 6.28033 0.21967C6.42098 0.360322 6.5 0.551088 6.5 0.75V5H10.75C10.9489 5 11.1397 5.07902 11.2803 5.21967C11.421 5.36032 11.5 5.55109 11.5 5.75C11.5 5.94891 11.421 6.13968 11.2803 6.28033C11.1397 6.42098 10.9489 6.5 10.75 6.5H6.5V10.75C6.5 10.9489 6.42098 11.1397 6.28033 11.2803C6.13968 11.421 5.94891 11.5 5.75 11.5C5.55109 11.5 5.36032 11.421 5.21967 11.2803C5.07902 11.1397 5 10.9489 5 10.75V6.5H0.75C0.551088 6.5 0.360322 6.42098 0.21967 6.28033C0.0790175 6.13968 0 5.94891 0 5.75C0 5.55109 0.0790175 5.36032 0.21967 5.21967C0.360322 5.07902 0.551088 5 0.75 5H5V0.75C5 0.551088 5.07902 0.360322 5.21967 0.21967C5.36032 0.0790175 5.55109 0 5.75 0Z"
              fill="#00898F"
            />
          </svg>
        </Button>
      </div>
    </>
  );
};
export default CountUpdate;
