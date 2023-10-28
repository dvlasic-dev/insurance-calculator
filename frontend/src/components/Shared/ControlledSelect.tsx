import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Select from "react-select";

type Props<T> = {
  label: string;
  name: string;
  rules: { required: string | boolean };
  options?: Array<T>;
};

function ControlledSelect<T>({ label, name, rules, options }: Props<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div
        className="mx-auto flex w-full py-2"
        aria-invalid={errors[name] ? "true" : "false"}
      >
        <label className="flex w-2/6 self-center" htmlFor={name}>
          {label}:
        </label>
        <Controller
          name="city"
          control={control}
          rules={rules}
          render={({ field }) => (
            <Select
              {...field}
              classNamePrefix="controlled"
              className="w-4/6"
              classNames={{
                control: () =>
                  "!w-full !rounded-md border !border-gray-500 py-1 ",
              }}
              options={options}
            />
          )}
        />
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="col-start-2 ml-[33%] text-red-600">{message}</p>
        )}
      />
    </>
  );
}

export default ControlledSelect;
