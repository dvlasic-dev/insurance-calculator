import { ErrorMessage } from "@hookform/error-message";
import { Controller, useFormContext } from "react-hook-form";
import { NumberFormatValues, NumericFormat } from "react-number-format";
// Using react-number-format because its a lot better than native input with type number

type InputT = {
  name: string;
  label: string;
  rules?: { required: string | boolean };
};

export default function NumericInput({
  rules = { required: false },
  ...props
}: InputT) {
  const isCurrencyInput = props.name !== "vehiclePower" ? true : false;
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const toggleStrongCarSurcharge = (values: NumberFormatValues) => {
    //enable and disable Strong car surcharge option based on vehicle power
    if (values.floatValue && values.floatValue >= 100) {
      setValue("strongCarSurcharge", true);
    } else setValue("strongCarSurcharge", false);
  };

  return (
    <>
      <div
        className="mx-auto flex w-full py-2"
        aria-invalid={errors[props.name] ? "true" : "false"}
      >
        <label className="flex w-2/6 self-center" htmlFor={props.name}>
          {props.label}:
        </label>
        <Controller
          control={control}
          name={props.name}
          rules={rules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <NumericFormat
              onValueChange={(values) => {
                onChange(values.floatValue);
                //call only if input is vehiclePower
                props.name === "vehiclePower" &&
                  toggleStrongCarSurcharge(values);
              }}
              onBlur={onBlur}
              value={value}
              getInputRef={ref}
              decimalScale={2}
              decimalSeparator=","
              thousandSeparator="."
              className={`${
                isCurrencyInput ? "w-3/6" : "w-4/6"
              } rounded-md border border-gray-500 p-2`}
            />
          )}
        />

        {isCurrencyInput ? (
          <span className="flex self-center pl-4 text-center">EUR</span>
        ) : null}
      </div>
      <ErrorMessage
        errors={errors}
        name={props.name}
        render={({ message }) => (
          <p className="col-start-2 ml-[33%] text-red-600">{message}</p>
        )}
      />
    </>
  );
}
