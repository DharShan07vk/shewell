import { startOfDay } from "date-fns";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAddress } from "~/models/address.model";
import { ICart, ICartLineItem } from "~/models/cart.model";
import { ICoupon } from "~/models/coupon.model";
import { IProduct, IProductVariant } from "~/models/product-model";

export const getDiscountedPrice = (productVariant: IProductVariant) => {
  const mrp = productVariant.priceInCents!;
  const discountInPercentage = productVariant.discountInPercentage;
  const discountInCents = productVariant.discountInCents;
  console.log("discountInCents", discountInCents);
  if (
    ((productVariant.discountEndDate &&
      productVariant.discountEndDate >= startOfDay(new Date())) ||
      !productVariant.discountEndDate) &&
    discountInPercentage
  ) {
    const discountedValue = mrp * (discountInPercentage / 100);
    const discountPrice = mrp - discountedValue;
    return discountPrice;
  }
  if (
    (!productVariant.discountEndDate ||
      (productVariant.discountEndDate &&
        productVariant.discountEndDate >= new Date())) &&
    discountInCents
  ) {
    const discountedValue = mrp - discountInCents;
    console.log("discountedPrice is", discountedValue);
    return discountedValue;
  }
  return productVariant.priceInCents;
};

// console.log('productVariants',ProductVariants)

type ICartStore = {
  cart: ICart;
  sheetIsOpen: boolean;
  setSheetIsOpen: (isOpen: boolean) => void;
  addToCart: (
    product: IProduct,
    quantity: number,
    productVariant: IProductVariant,
  ) => void;
  buyNow: (
    product: IProduct,
    quantity: number,
    productVariant: IProductVariant,
  ) => void;
  decrementFromCart: (
    product: IProduct,
    productVariant: IProductVariant,
  ) => void;
  removeFromCart: (product: IProduct, productVariantId: string) => void;
  updateCartLineItem: (
    products: { product: IProduct; productVariantId: string }[],
    coupon: ICoupon | null,
  ) => void;
  emptyCart: () => void;
  setCoupon: (coupon: ICoupon) => void;
  removeCoupon: () => void;
  setAddress: (address: IAddress) => void;
};

const recalculateCartLineItem = (
  product: IProduct,
  productVariant: IProductVariant,
  quantity: number,
): ICartLineItem => {
  const updatedPerUnitPriceInCent = productVariant.priceInCents!;
  const discountPrice = getDiscountedPrice(productVariant);
  // const subTotalInCent = updatedPerUnitPriceInCent * quantity;
  const subTotalInCent = discountPrice * quantity;
  const discountInCent = 0;
  const totalInCent = subTotalInCent - discountInCent;

  return {
    product: product,
    productVariantId: productVariant.id,
    perUnitPriceInCent: updatedPerUnitPriceInCent,
    quantity,
    subTotalInCent,
    discountInCent,
    totalInCent,
  };
};

export const recalculateCart = (
  cart: ICart,
  lineItems: ICartLineItem[],
): ICart => {
  let couponAmount = cart.coupon?.amount || 0;
  let couponDiscountInCent = 0;
  let cartSubtotal = lineItems.reduce((a, b) => a + b.totalInCent, 0);

  const totalCouponAmountEligible = lineItems.reduce((a, b) => {
    if (!cart.coupon) {
      return 0;
    }
    if (
      cart.coupon?.categories.map((p) => p.id).indexOf(b.product.categoryId) !==
      -1
    ) {
      return a + b.totalInCent;
    } else if (
      cart.coupon?.products.map((p) => p.id).indexOf(b.product.id) !== -1
    ) {
      return a + b.totalInCent;
    }
    return 0;
  }, 0);
  console.log("totalCouponAmountEligible", totalCouponAmountEligible);

  if (totalCouponAmountEligible > 0) {
    if (cart.coupon && cart.coupon.isPercent) {
      couponDiscountInCent =
        totalCouponAmountEligible * (cart.coupon.amount / 100);
    }

    if (cart.coupon && !cart.coupon.isPercent) {
      couponDiscountInCent = cart.coupon.amount;
    }
    const cartTaxesInCent = 0;
    const cartDeliveryFeesInCent = 0;
    const cartTotalInCent =
      cartSubtotal +
      cartTaxesInCent +
      cartDeliveryFeesInCent -
      couponDiscountInCent;
    return {
      ...cart,
      lineItems,
      subTotalInCent: cartSubtotal,
      taxesInCent: cartTaxesInCent,
      deliveryFeesInCent: cartDeliveryFeesInCent,
      totalInCent: cartTotalInCent,
      discountInCent: couponDiscountInCent,
    };
  }
  if (
    cart.coupon &&
    cart.coupon.products.length === 0 &&
    cart.coupon.categories.length === 0 &&
    cart.coupon.users.length === 0
  ) {
    if (cart.coupon.isPercent) {
      couponDiscountInCent = cartSubtotal * (couponAmount / 100);
    } else {
      couponDiscountInCent = couponAmount;
      if (cartSubtotal < 0) {
        couponDiscountInCent = cartSubtotal;
        cartSubtotal = 0;
      }
    }
  }
  const cartTaxesInCent = 0;
  const cartDeliveryFeesInCent = 0;
  const cartTotalInCent =
    cartSubtotal +
    cartTaxesInCent +
    cartDeliveryFeesInCent -
    couponDiscountInCent;

  return {
    ...cart,
    lineItems,
    subTotalInCent: cartSubtotal,
    taxesInCent: cartTaxesInCent,
    deliveryFeesInCent: cartDeliveryFeesInCent,
    totalInCent: cartTotalInCent,
    discountInCent: couponDiscountInCent,
  };
};

const recalculateCartForCoupon = (cart: ICart) => {
  return recalculateCart(cart, cart.lineItems);
};

const removeFromCartSharedFn = (
  cart: ICart,
  product: IProduct,
  productVariantId: string,
): ICart => {
  const lineItems = cart.lineItems.filter(
    (i) =>
      !(i.product.id == product?.id && i.productVariantId === productVariantId),
  );
  return recalculateCart(cart, lineItems);
};

const updateCartLineItemOperation = (
  cart: ICart,
  product: IProduct,
  productVariantId: string,
): ICart => {
  // get lineitem from cart
  const lineItem = cart.lineItems.find(
    (i) =>
      i.product.id == product?.id && i.productVariantId === productVariantId,
  );

  // If lineitem are not found - not possible
  if (!lineItem) {
    return cart;
  }

  // get productVariant to update
  const productVariant = product.productVariants.find((p) => {
    return productVariantId === p.id;
  });

  if (!productVariant) {
    return cart;
  }

  let quantity = productVariant.productVariantInventory?.available || 0;

  // If quantity is 0 then remove the item
  if (quantity === 0) {
    let updateCart = removeFromCartSharedFn(cart, product, productVariantId);
    return recalculateCart(cart, updateCart.lineItems);
  }

  console.log(
    "lineItem.quantity",
    lineItem.quantity <= quantity,
    lineItem.quantity,
    quantity,
  );

  // If old quantity is greater or equal to the quantity available
  if (lineItem.quantity <= quantity) {
    quantity = lineItem.quantity;
  }

  console.log(
    "lineItem.quantity updated",
    lineItem.quantity <= quantity,
    lineItem.quantity,
    quantity,
  );

  // remove the old cart line item
  let updateCart = removeFromCartSharedFn(cart, product, productVariantId);

  console.log("lineItem.quantity updated lineItems", updateCart);
  // add the updated product in cart
  const lineItems = [...updateCart.lineItems];
  const newLineItem: ICartLineItem = recalculateCartLineItem(
    product,
    productVariant,
    quantity,
  );
  lineItems.push(newLineItem);
  console.log("lineItem.quantity updated lineItems", lineItems);
  return recalculateCart(cart, lineItems);
};

export const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      sheetIsOpen: false,
      setSheetIsOpen: (isOpen: boolean) => {
        set((state) => ({ sheetIsOpen: isOpen }));
      },
      cart: {
        lineItems: [],
        subTotalInCent: 0,
        taxesInCent: 0,
        deliveryFeesInCent: 0,
        totalInCent: 0,
        discountInCent: 0,
      },
      addToCart: (
        product: IProduct,
        quantity: number,
        productVariant: IProductVariant,
      ) => {
        let index = -1;
        const cart = { ...get().cart };
        for (let i = 0; i < cart.lineItems.length; i++) {
          if (cart.lineItems[i]?.product.id === product.id) {
            if (cart.lineItems[i]?.productVariantId === productVariant.id) {
              index = i;
              break;
            }
          }
        }
        if (index !== -1) {
          const lineItems = cart.lineItems.filter(
            (i) =>
              i.product.id !== product.id ||
              (i.product.id == product.id &&
                i.productVariantId !== productVariant?.id),
          );
          const updatedQuantity =
            (cart.lineItems[index]?.quantity || 0) + quantity;
          const newLineItem: ICartLineItem = recalculateCartLineItem(
            product,
            productVariant,
            updatedQuantity,
          );
          lineItems.splice(index, 0, newLineItem);
          const finalCart: ICart = recalculateCart(cart, lineItems);
          set({ cart: finalCart });
        } else {
          const lineItems = [...cart.lineItems];
          const newLineItem: ICartLineItem = recalculateCartLineItem(
            product,
            productVariant,
            quantity,
          );
          lineItems.push(newLineItem);
          const finalCart: ICart = recalculateCart(cart, lineItems);
          set({ cart: finalCart });
        }
      },
      buyNow: (
        product: IProduct,
        quantity: number,
        productVariant: IProductVariant,
      ) => {
        // console.log("buying the varinat", productVariant);
        const newLineItem: ICartLineItem = recalculateCartLineItem(
          product,
          productVariant,
          quantity,
        );
        const lineItems = [newLineItem];
        // console.log("new Line item in the cart", lineItems);
        const cart = {
          lineItems,
          subTotalInCent: 0,
          taxesInCent: 0,
          deliveryFeesInCent: 0,
          totalInCent: 0,
          discountInCent: 0,
        };
        const finalCart: ICart = recalculateCart(cart, lineItems);
        set({ cart: finalCart });
      },
      decrementFromCart: (
        product: IProduct,
        productVariant: IProductVariant,
      ) => {
        const cart = { ...get().cart };
        const item = cart.lineItems.find(
          (i) =>
            i.product.id === product.id &&
            i.productVariantId === productVariant.id,
        );
        if (item) {
          if (item.quantity === 1) {
            const updatedCart = removeFromCartSharedFn(
              cart,
              product,
              productVariant.id,
            );
            set({ cart: updatedCart });
          } else {
            const lineItems = cart.lineItems.filter(
              (i) =>
                i.product.id !== product.id ||
                (i.product.id == product.id &&
                  i.productVariantId !== productVariant.id),
            );
            let index = -1;
            for (let i = 0; i < cart.lineItems.length; i++) {
              if (
                cart.lineItems[i]?.product.id === product.id &&
                cart.lineItems[i]?.productVariantId === productVariant.id
              ) {
                index = i;
                break;
              }
            }
            const finalQuantity = (cart.lineItems[index]?.quantity || 0) - 1;
            const json = recalculateCartLineItem(
              product,
              productVariant,
              finalQuantity,
            );
            // items.push(json);
            lineItems.splice(index, 0, json);
            const updatedCart = recalculateCart(cart, lineItems);
            set({ cart: updatedCart });
          }
        }
      },
      removeFromCart: (product: IProduct, productVariantId: string) => {
        const cart = { ...get().cart };
        const updatedCart = removeFromCartSharedFn(
          cart,
          product,
          productVariantId,
        );
        set({ cart: updatedCart });
      },
      updateCartLineItem: (
        products: { product: IProduct; productVariantId: string }[],
        coupon: ICoupon | null,
      ) => {
        const cart = {
          ...get().cart,
          lineItems: get().cart.lineItems.filter(
            (lineItem) =>
              !!products.find(
                (p) =>
                  p.product.id === lineItem.product.id &&
                  p.productVariantId === lineItem.productVariantId,
              ),
          ),
        };
        let recentCart: ICart = cart;
        for (let product of products) {
          // Getting updated Cart
          const updatedCart = updateCartLineItemOperation(
            cart,
            product.product,
            product.productVariantId,
          );
          console.log("updated cart", updatedCart);
          // recalculating coupon discount
          recentCart = recalculateCartForCoupon({
            ...updatedCart,
            coupon: coupon || undefined,
          });
        }
        set({ cart: recentCart });
      },
      emptyCart: () => {
        set({
          cart: {
            lineItems: [],
            subTotalInCent: 0,
            taxesInCent: 0,
            deliveryFeesInCent: 0,
            totalInCent: 0,
            discountInCent: 0,
          },
        });
      },
      setCoupon: (coupon: ICoupon) => {
        const updatedCart: ICart = { ...get().cart, coupon: coupon };
        console.log("updated cart is", updatedCart);
        const recentCart = recalculateCartForCoupon(updatedCart);
        set({ cart: recentCart });
      },
      removeCoupon: () => {
        const cart: ICart = { ...get().cart, coupon: undefined };
        const updatedCart = recalculateCartForCoupon(cart);
        set({ cart: updatedCart });
      },
      setAddress: (address: IAddress) => {
        const updatedCart: ICart = { ...get().cart, address: address };
        set({ cart: updatedCart });
      },
    }),
    {
      version: 2,
      name: "sheWellCare-cart", // name of the item in the storage (must be unique)
      // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
