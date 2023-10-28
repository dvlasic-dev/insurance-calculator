import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

type Props = {
  label: string;
  name: string;
  rules: { required: string | boolean };
  maxDate?: Date;
};

function DateInput({ label, name, rules, maxDate }: Props) {
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
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DatePicker
              className="w-4/6"
              onChange={onChange}
              value={value}
              onBlur={onBlur}
              maxDate={maxDate ?? undefined}
              inputRef={ref}
              locale="hr-hr"
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

export default DateInput;
