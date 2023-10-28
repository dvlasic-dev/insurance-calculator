import { formatCurrency } from "../../utils/functions";
import { PriceMatch } from "../../utils/types";

type Props = { priceDetails: PriceMatch };

function PriceDetails({ priceDetails }: Props) {
  return (
    <div className="mx-8 mt-8 max-w-7xl ">
      <h1 className="text-3xl font-bold">Price details</h1>
      <div className="my-4 flex flex-col">
        <h3 className="text-xl">
          <span className="font-medium">Basic price:</span>{" "}
          {formatCurrency(priceDetails?.basePrice)}
        </h3>
        <div className="my-4">
          {priceDetails?.discountsSurcharges ? (
            <>
              <h3 className="text-xl font-medium">Discounts:</h3>
              <ul className="ml-4">
                {priceDetails?.discountsSurcharges.map((discount) => {
                  return (
                    <li key={discount.name}>
                      <span className="font-semibold">{discount.name}</span>:{" "}
                      {formatCurrency(discount.value)}
                    </li>
                  );
                })}
                {priceDetails.voucher > 0 ? (
                  <li>
                    <span className="font-semibold">Voucher</span>:{" "}
                    {formatCurrency(priceDetails.voucher)}
                  </li>
                ) : null}
              </ul>
            </>
          ) : null}
          {priceDetails?.coverages ? (
            <>
              <h3 className="text-xl font-medium">Coverages:</h3>
              <ul className="ml-4">
                {priceDetails?.coverages.map((coverage) => {
                  return (
                    <li key={coverage.name}>
                      <span className="font-semibold">{coverage.name}</span>:{" "}
                      {formatCurrency(coverage.value)}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </div>
        <h3 className="text-xl ">
          <span className="font-medium">Total price:</span>{" "}
          {formatCurrency(priceDetails?.totalPrice)}
        </h3>
      </div>
    </div>
  );
}

export default PriceDetails;
