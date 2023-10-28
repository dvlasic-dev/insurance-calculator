import Input from "../Shared/Input";
import DateInput from "../Shared/DateInput";
import NumericInput from "../Shared/NumericInput";
import ControlledSelect from "../Shared/ControlledSelect";
import { useQuery } from "react-query";
import { getCities } from "../../utils/fetchData";
import { City } from "../../utils/types";
import { getMaxDate } from "../../utils/functions";

export default function FormMain() {
  const { data, isFetching } = useQuery("cities", getCities);

  return (
    <div className="mt-8">
      <Input label="Name" name="name" required="Enter your name" />
      <DateInput
        name="birthdate"
        label="Birthdate"
        maxDate={getMaxDate(18)}
        rules={{ required: "Enter your birthdate" }}
      />

      {isFetching ? (
        <div className="my-2 ml-[33%] min-h-[42px]  w-4/6 animate-pulse self-center rounded-md bg-gray-400" />
      ) : (
        <ControlledSelect<City & { label: string; value: string }>
          label="City"
          name="city"
          options={data}
          rules={{ required: "Pick city" }}
        />
      )}

      <NumericInput
        label="Vehicle power"
        name="vehiclePower"
        rules={{ required: "Enter vehicle power" }}
      />
      <NumericInput label="Voucher" name="voucher" />
      <NumericInput label="Price match" name="priceMatch" />
      <button
        className="ml-[33%] mt-2 rounded-md bg-gray-300 px-4 py-2"
        type="submit"
      >
        Save
      </button>
    </div>
  );
}
