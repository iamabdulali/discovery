import React, { useContext, useEffect, useState } from "react";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { galleryItems } from "../constant";
import { Context } from "../main";

const TableView = () => {
  const imagesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { images } = useContext(Context);

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const imagesToDisplay = images.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const lgReactElement = document.querySelector(".lg-react-element");
    lgReactElement.style.display = "contents";
  }, []);

  return (
    <div className="my-12">
      <div className="relative overflow-x-auto my-12 min-h-[400px]">
        <table className="w-full text-sm font-semibold text-left ">
          <thead className="text-xs border-b border-[#737373]  uppercase  text-[#737373]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date Time
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Store
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            <LightGallery
              onInit={onInit}
              speed={500}
              plugins={[lgThumbnail, lgZoom]}
            >
              {imagesToDisplay.map((imageGroup, index) => {
               
                return imageGroup.Images.map(
                  ({ storeName, image, category, dateTime }, imageIndex) => (
                    <a href={image} className="contents" key={imageIndex}>
                      <img
                        className="rounded-t-lg hidden absolute object-cover object-top min-h-[250px] max-h-[250px] w-full"
                        alt={storeName}
                        src={image}
                      />
                      <tr className="bg-white border-b border-[#737373] cursor-pointer">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {dateTime}
                        </th>
                        <td className="px-6 py-4">{imageGroup.company}</td>
                        <td className="px-6 py-4">{storeName}</td>
                        <td className="px-6 py-4">{category}</td>
                      </tr>
                    </a>
                  )
                );
              })}
            </LightGallery>
          </tbody>
        </table>
      </div>
      <>
        <ul className="flex items-center justify-center  mt-10 -space-x-px h-8 text-sm">
          {Array.from({
            length: Math.ceil(imagesToDisplay.length / imagesPerPage),
          }).map((_, index) => (
            <li
              key={index}
              onClick={() => goToPage(index + 1)}
              className={` ${
                currentPage === index + 1
                  ? "bg-[#737373] text-white"
                  : "bg-white text-[#737373]"
              } flex items-center cursor-pointer shadow-2xl hover:opacity-80 justify-center px-4 h-10 leading-tight  border border-[#737373]`}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </>
    </div>
  );
};

export default TableView;
