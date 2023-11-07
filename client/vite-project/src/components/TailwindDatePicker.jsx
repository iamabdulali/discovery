import React, { useContext, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { Context } from "../main";

const TailwindDatePicker = () => {
  const { dateValue, setDateValue } = useContext(Context);

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setDateValue(newValue);
  };

  return (
    <Datepicker
      value={dateValue}
      onChange={handleValueChange}
      inputClassName="bg-field-color rounded-lg w-full py-4 px-4"
      placeholder={"Date"}
    />
  );
};
export default TailwindDatePicker;
