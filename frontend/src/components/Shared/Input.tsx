import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

type InputT = {
  name: string;
  label: string;
  type?: string;
  required: string | boolean;
};

export default function Input({ type = "text", ...props }: InputT) {
  const isCurrencyInput =
    type === "number" && props.name !== "vehiclePower" ? true : false;
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div
        className="mx-auto flex w-full py-2"
        aria-invalid={errors[props.name] ? "true" : "false"}
      >
        <label className="flex w-2/6 self-center" htmlFor={props.name}>
          {props.label}:
        </label>
        <input
          type={type}
          className={`${
            isCurrencyInput ? "w-3/6" : "w-4/6"
          } rounded-md border border-gray-500 p-2`}
          {...register(props.name, { required: props.required })}
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
