import React, { useState, useEffect } from "react";
import { useClickAway } from "@uidotdev/usehooks";

const Dropdown = ({
  options,
  labels,
  title,
  icon,
  handleOptionSelection,
  category,
  checkboxState,
  setCheckboxState,
 
}) => {
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // const [checkboxState, setCheckboxState] = useState({});



  const ref = useClickAway(() => {
    setIsOpen(false);
  });

  const handleOpenModal = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const toggleOption = (option) => {
    const isChecked = !checkboxState[option];
    const updatedCheckboxState = { ...checkboxState };
    updatedCheckboxState[option] = isChecked;
    setCheckboxState(updatedCheckboxState);
  
    handleOptionSelection(option, category, isChecked); // Pass the isChecked parameter
  };
  
  useEffect(() => {
    const initialCheckboxState = {};
    options.forEach((option) => {
      initialCheckboxState[option] = checkboxState[option] || false; // Initialize based on the checkboxState prop
    });
    setCheckboxState(initialCheckboxState);
  }, []);
  
  

  return (
    <div className="relative inline-block text-left w-full">
      <button
        className="px-4 py-2 rounded-md font-semibold md:rounded-br-lg md:rounded-bl-lg w-full bg-[#f7f7f7] text-[#737373] flex items-center focus:bg-[#737373] focus:text-white"
        onClick={handleOpenModal}
      >
        <span className="mr-3 focus:text-white">{icon}</span>
        {title}
      </button>

      <div
        ref={ref}
        className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg z-10 max-h-[400px] overflow-y-auto ${
          isOpen ? "" : "hidden"
        }`}
        style={{ background: "#737373", color: "#fff" }}
      >
        <div className="py-1">
          {options.map((option, index) => (
            <label
              key={option}
              className="flex items-center justify-start px-4 py-2 hover:bg-[#505050]"
            >
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                checked={checkboxState[option]}
                onChange={() => toggleOption(option)}
              />
              <span className="ml-3">{labels[index]}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
