import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormHeader from "./FormHeader";
import FormMain from "./FormMain";
import FormSidebar from "./FormSidebar";
import { PriceMatch, UserData } from "../../utils/types";
import { getInsuranceEstimate } from "../../utils/fetchData";
import { getMaxDate } from "../../utils/functions";
import PriceDetails from "./PriceDetails";
import Loader from "../Shared/Loader";

export default function InsuranceForm() {
  const methods = useForm<UserData>({
    defaultValues: { birthdate: getMaxDate(18) },
  });
  const [priceDetails, setPriceDetails] = useState<PriceMatch>();
  const [loading, setLoading] = useState(false);

  const submit = async (data: UserData) => {
    setLoading(true);
    const response = await getInsuranceEstimate(
      `${import.meta.env.VITE_BACKEND_URL}api/estimate`,
      data,
    );
    setPriceDetails(response);
    setLoading(false);
  };
  const [coveragesCount, setCoveragesCount] = useState(0);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)}>
        <FormHeader
          coveragesCount={coveragesCount}
          totalPrice={priceDetails ? priceDetails.totalPrice : 0}
        />
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="order-2 col-span-3 mt-10 w-full max-w-lg px-4 pb-6 md:order-1 md:ml-10 md:px-0 md:pb-0">
            <h1 className="text-3xl font-bold">User data</h1>
            <FormMain />
          </div>
          <FormSidebar setCoveragesCount={setCoveragesCount} />
        </div>
      </form>
      <div className="min-h-[400px]">
        {loading ? (
          <div className="ml-[30%] mt-10 flex w-fit">
            <Loader />
          </div>
        ) : priceDetails ? (
          <PriceDetails priceDetails={priceDetails} />
        ) : null}
      </div>
    </FormProvider>
  );
}
