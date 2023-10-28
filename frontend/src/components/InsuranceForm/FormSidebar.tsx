import { useQuery } from "react-query";
import Checkbox from "../Shared/Checkbox";
import { toCamelCase } from "../../utils/functions";
import { getCoverages } from "../../utils/fetchData";

type Props = {
  setCoveragesCount: React.Dispatch<React.SetStateAction<number>>;
};
function FormSidebar({ setCoveragesCount }: Props) {
  const { data, isFetching } = useQuery("coverages", getCoverages);

  return (
    <div className="order-1 bg-gray-200 p-6 pt-8 md:order-2">
      <h1 className="text-3xl font-bold">Coverages</h1>
      <div className="mt-4 min-h-[120px]">
        {isFetching ? (
          <div className="w-full animate-pulse pt-1">
            <div className="my-6 h-3 w-full rounded-lg bg-gray-500 " />
            <div className="my-6 h-3 w-full rounded-lg bg-gray-500 " />
            <div className="my-6 h-3 w-full rounded-lg bg-gray-500 " />
          </div>
        ) : (
          data?.map((coverage) => {
            return (
              <Checkbox
                id={coverage._id}
                key={coverage._id}
                setCoveragesCount={setCoveragesCount}
                label={coverage.name}
                name={toCamelCase(coverage.name)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default FormSidebar;
