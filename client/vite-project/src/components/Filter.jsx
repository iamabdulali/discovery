import React, { useContext, useEffect, useRef, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { BiCategory, BiCurrentLocation, BiImage } from "react-icons/bi";
import TailwindDatePicker from "./TailwindDatePicker";
import Dropdown from "./Dropdown";
import { CgMathPlus } from "react-icons/cg";
import axios from "axios"; // Import Axios at the top of your file
import { Context } from "../main";

const Filter = () => {
  const [selectedOptions, setSelectedOptions] = useState([]); // Step 1: Create state for selected options
  const searchInputRef = useRef(null);
  const { dateValue, setImages } = useContext(Context);

  const [checkboxState, setCheckboxState] = useState({});

  const [categoriesOptions, setCategoriesOptions] = useState([])
  const [locationOptions, setlocationOptions] = useState([])
  const [companyOptions, setcompanyOptions] = useState([])
  const [storeOptions, setstoreOptions] = useState([])

  // Step 4: Update the input field value
  const handleInputChange = (selectedOptions) => {
    // Concatenate selected options and set them in the input field
    const inputValue = selectedOptions.join(", ");
    // Use the ref to access the input field value and update it
    searchInputRef.current.placeholder = "";

    if (selectedOptions.length == 0) {
      searchInputRef.current.placeholder = "Search Images...";
    }
  };

  const handleOptionRemoval = (index) => {
    const removedOption = selectedOptions[index];
    const updatedOptions = [...selectedOptions];
    updatedOptions.splice(index, 1);
  
    // Remove the option from the checkbox state
    const updatedCheckboxState = { ...checkboxState };
    updatedCheckboxState[removedOption] = false; // Uncheck the removed option
  
    setSelectedOptions(updatedOptions);
    setCheckboxState(updatedCheckboxState);
  
    // Call the handleOptionSelection function with the isChecked parameter as false
    handleOptionSelection(removedOption, getCategoryForOption(removedOption), false);
  };
  
  

  // Define separate state arrays for each category
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);

  // Define a function to handle option selection
  const handleOptionSelection = (option, category, isChecked) => {
    // Update the selected options based on the category
    switch (category) {
      case "stores":
        setSelectedStores((prevStores) =>
          isChecked
            ? [...prevStores, option]
            : prevStores.filter((item) => item !== option)
        );
        break;
      case "categories":
        setSelectedCategories((prevCategories) =>
          isChecked
            ? [...prevCategories, option]
            : prevCategories.filter((item) => item !== option)
        );
        break;
      case "locations":
        setSelectedLocations((prevLocations) =>
          isChecked
            ? [...prevLocations, option]
            : prevLocations.filter((item) => item !== option)
        );
        break;
      case "company":
        setSelectedCompany((prevCompany) =>
          isChecked
            ? [...prevCompany, option]
            : prevCompany.filter((item) => item !== option)
        );
        break;
      default:
      // Do nothing for unknown categories
    }
  
    const updatedOptions = [...selectedOptions];
    const optionIndex = updatedOptions.indexOf(option);
  
    if (isChecked) {
      updatedOptions.push(option); // Select the option
    } else {
      updatedOptions.splice(optionIndex, 1); // Deselect the option
    }
  
    setSelectedOptions(updatedOptions); // Update selected options state
  
    // Step 4: Update the input field value
    handleInputChange(updatedOptions);
  };
  

  const handleFilterSubmission = () => {
    // Define the base URL
    const baseUrl = "http://localhost:3000/getImages";

    // Create an array to store the query parameters
    const queryParams = [];

    // Add selectedStores to the query parameters
    selectedStores.forEach((store) => {
      queryParams.push(`store=${store}`);
    });

    // Add selectedCategories to the query parameters
    selectedCategories.forEach((category) => {
      queryParams.push(`category=${category}`);
    });

    // Add selectedLocations to the query parameters
    selectedLocations.forEach((location) => {
      queryParams.push(`location=${location}`);
    });

    // Add selectedCompany to the query parameters
    selectedCompany.forEach((company) => {
      queryParams.push(`company=${company}`);
    });


    if(dateValue.startDate){

    // Add the dateValue to the query parameters
    queryParams.push(`startDatetime=${dateValue.startDate}`);
    queryParams.push(`endDatetime=${dateValue.endDate}`);
    }
    // Construct the final URL with query parameters
    const apiUrl = `${baseUrl}?${queryParams.join("&")}`;

    console.log(apiUrl);

    // Use Axios to make the API request
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the API response here
        console.log("API response:", response.data);

        setImages(response.data);
        

        // You can set the response data to your state or perform other actions as needed
      })
      .catch((error) => {
        // Handle errors
        console.error("API request error:", error);
      });
  };

  useEffect(() => {
    const getOptionsFromApi = async () => {
      const baseUrl = "http://localhost:3000/getImages";
  
      try {
        const response = await axios.get(baseUrl);
        const data = response.data;
  
        // Extract unique categories from the response data
        const uniqueCategories = [...new Set(data.map(item => item.category))];
        const uniqueLocations = [...new Set(data.map(item => item.location))];
        const uniqueStores = [...new Set(data.map(item => item.store))];
        const uniqueCompanies = [...new Set(data.map(item => item.company))];
  
        setCategoriesOptions(uniqueCategories);
        setstoreOptions(uniqueStores);
        setlocationOptions(uniqueLocations);
        setcompanyOptions(uniqueCompanies);
        setImages(data);
      } catch (error) {
        console.error("API request error:", error);
      }
    }
  
    getOptionsFromApi();
  }, []);
  


  const getCategoryForOption = (option) => {
    if (selectedStores.includes(option)) {
      return "stores";
    } else if (selectedCategories.includes(option)) {
      return "categories";
    } else if (selectedLocations.includes(option)) {
      return "locations";
    } else if (selectedCompany.includes(option)) {
      return "company";
    }
  
    return ""; // Return an empty string for unknown options
  };
  
  return (
    <div>
      <div
        className="p-4 mt-24 flex w-11/12 xl:w-8/12 mx-auto rounded-lg max-w-[1150px]"
        style={{ background: "#d4d4d4" }}
      >
        <div className="space-y-4 w-full m-auto">
          <div className="md:flex space-y-3 md:space-y-0 items-center justify-center gap-4 relative">
            <input
              ref={searchInputRef}
              type="search"
              id="default-search"
              className="block w-full py-4 pl-4  rounded-lg bg-field-color outline-none focus:outline-none"
              placeholder="Search Images..."
              required
            />

            <div className="absolute top-0 md:top-auto flex left-3 z-10 md:w-[400px] overflow-hidden">
              {selectedOptions.map((option, index) => {
                return (
                  <div
                    key={option}
                    className="flex bg-[#737373] text-white mr-3 p-2 font-semibold text-sm px-2 rounded-xl"
                  >
                    <span className="capitalize">{option}</span>
                    <CgMathPlus
                      className="rotate-45 cursor-pointer"
                      size={20}
                      onClick={() => handleOptionRemoval(index)}
                    />
                  </div>
                );
              })}
            </div>

            <TailwindDatePicker />
            <button
              style={{ background: "#737373" }}
              className="text-white hidden md:block font-semibold py-4 rounded w-6/12 hover:opacity-80"
              onClick={() => {
                handleFilterSubmission();
              }}
            >
              Search
            </button>
          </div>

          <div className="md:flex lg:w-[79%] gap-4 space-y-3 md:space-y-0">
            <Dropdown
              title="Category"
              icon={<BiCategory size={24} />}
              options={categoriesOptions} 
  labels={categoriesOptions} 
              handleOptionSelection={handleOptionSelection}
              category="categories"
              checkboxState={checkboxState}
              setCheckboxState={setCheckboxState}
            />
            <Dropdown
              title="Stores"
              icon={<FiPackage size={24} />}
              options={storeOptions} 
              labels={storeOptions} 
              handleOptionSelection={handleOptionSelection}
              category="stores"
              checkboxState={checkboxState}
              setCheckboxState={setCheckboxState}
            />
            <Dropdown
              title="Company"
              icon={<BiImage size={24} />}
              options={companyOptions} 
              labels={companyOptions} 
              handleOptionSelection={handleOptionSelection}
              category="company"
              checkboxState={checkboxState}
              setCheckboxState={setCheckboxState}
            />
            <Dropdown
              title="Location"
              icon={<BiCurrentLocation size={24} />}
              options={locationOptions} 
              labels={locationOptions} 
              handleOptionSelection={handleOptionSelection}
              category="locations"
              checkboxState={checkboxState}
              setCheckboxState={setCheckboxState}
            />
            <button
              style={{ background: "#737373" }}
              id="mobile-search"
              className="text-white font-semibold py-4 rounded w-6/12 hover:opacity-80"
              onClick={() => {
                // Handle filter submission here
              }}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
