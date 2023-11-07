import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

export const Context = createContext(null);

const AppWrapper = () => {
  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [images, setImages] = useState([]);

  return (
    <Context.Provider
      value={{
        dateValue,
        setDateValue,
        selectedCategories,
        selectedLocations,
        selectedStores,
        setSelectedCategories,
        setSelectedLocations,
        setSelectedStores,
        images,
        setImages,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
