export const centsToRupee = (cents: number | undefined | null) => {
  if (cents !== undefined && cents !== null) {
    return (cents / 100.0).toFixed(2);
  }
};

export const currencyFormatter = (
  priceInCents: number | undefined | null,
  currency = "INR",
) => {
  if (priceInCents === undefined || priceInCents === null) {
    return;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
  }).format(priceInCents / 100.0);
};
