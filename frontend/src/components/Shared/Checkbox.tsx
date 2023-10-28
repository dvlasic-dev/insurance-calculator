import { useFormContext } from "react-hook-form";

type InputT = {
  name: string;
  label: string;
  setCoveragesCount?: React.Dispatch<React.SetStateAction<number>>;
  adviserEnabled?: boolean;
  id: string;
};

export default function Checkbox(props: InputT) {
  const { register, watch, getValues, setValue } = useFormContext();

  //disable for strongCarSurcharge, for adviserDiscount check if two+ coverages are checked to enable input
  function shouldBeDisabled() {
    if (props.name === "strongCarSurcharge") {
      return true;
    }
    if (props.name === "adviserDiscount") {
      if (props.adviserEnabled) {
        //enable input for adviser discount
        return false;
      } else {
        //when less than two coverages are checked, uncheck the adviser discount
        setValue("adviserDiscount", false);
        return true;
      }
    }
    if (props.name === "vipDiscount") {
      //if vehicle power is 80 or more, enable VIP discount checkbox, if not, disable checkbox and set vipDiscount to false
      if (watch("vehiclePower") && getValues("vehiclePower") >= 80) {
        return false;
      } else {
        setValue("vipDiscount", false);
        return true;
      }
    }

    return false;
  }
  const onCoveragesChange = (isChecked: boolean) => {
    //type guard for setCoveragesCount
    if (isChecked) {
      setValue(props.name, { checked: true, id: props.id });
    } else setValue(props.name, false);
    props.setCoveragesCount &&
      props.setCoveragesCount((coveragesCount) =>
        isChecked ? coveragesCount + 1 : coveragesCount - 1,
      );
  };
  return (
    <>
      <div className="mx-auto flex w-full py-2">
        <input
          disabled={shouldBeDisabled()}
          type="checkbox"
          className=""
          id={props.name}
          {...register(props.name, { required: false })}
          onChange={(event) => {
            onCoveragesChange(event.target.checked);
          }}
        />
        <label className="ml-2 flex self-center" htmlFor={props.name}>
          {props.label}
        </label>
      </div>
    </>
  );
}
