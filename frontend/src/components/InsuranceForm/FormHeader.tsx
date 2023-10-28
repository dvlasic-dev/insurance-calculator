import { useQuery } from "react-query";
import Checkbox from "../Shared/Checkbox";
import { Discount } from "../../utils/types";
import { formatCurrency, toCamelCase } from "../../utils/functions";
import { getDiscounts } from "../../utils/fetchData";

export default function FormHeader({
  coveragesCount,
  totalPrice,
}: {
  coveragesCount: number;
  totalPrice: number;
}) {
  const adviserEnabled = coveragesCount >= 2 ? true : false;
  const { data, isFetching } = useQuery("discounts", getDiscounts);

  return (
    <div className="grid min-h-[88px] grid-cols-1 gap-4 bg-gray-200 px-4 py-6 md:grid-cols-5">
      {isFetching ? (
        <div className="col-span-4 flex w-full self-center font-medium">
          Loading discounts...
        </div>
      ) : (
        data?.map((discount: Discount) => {
          return (
            <Checkbox
              id={discount._id}
              key={discount._id}
              adviserEnabled={adviserEnabled}
              label={discount.name}
              name={toCamelCase(discount.name)}
            />
          );
        })
      )}

      <div className="flex self-center">
        <h3 className="text-xl">Total price: {formatCurrency(totalPrice)}</h3>
      </div>
    </div>
  );
}
