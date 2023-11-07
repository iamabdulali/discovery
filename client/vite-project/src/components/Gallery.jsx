import React, { useContext, useState } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-rotate.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Autoplay from "lightgallery/plugins/autoplay";
import { Context } from "../main.jsx";

function Gallery() {
  const imagesPerPage = 5;
  const { images } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = Math.min(startIndex + imagesPerPage, images.length);

  // Get the images to display for the current page
  const imagesToDisplay = images.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="my-12">
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom, Autoplay]}>
        {imagesToDisplay.map((imageGroup, index) => {
          return imageGroup.Images.map(
            ({ storeName, image, category, dateTime }, imageIndex) => (
              <a
                href={image}
                className="max-w-sm rounded-lg shadow-2xl gallery-item"
                style={{ background: "#f7f7f7", color: "#737373" }}
                key={imageIndex}
              >
                <img
                  className="rounded-t-lg object-cover object-top min-h-[250px] max-h-[250px] w-full"
                  alt={storeName}
                  src={image}
                />
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight">
                      {storeName}
                    </h5>
                  </a>
                  <div className="block">
                    <p className="mb-1">{category}</p>
                    <p>{dateTime}</p>
                  </div>
                </div>
              </a>
            )
          );
        })}
      </LightGallery>

      <ul className="flex items-center justify-center  mt-10 -space-x-px h-8 text-sm">
        {Array.from({
          length: Math.ceil(images.length / imagesPerPage),
        }).map((_, index) => (
          <li
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`${
              currentPage === index + 1
                ? "bg-[#737373] text-white"
                : "bg-white text-[#737373]"
            } flex items-center cursor-pointer shadow-2xl hover:opacity-80 justify-center px-4 h-10 leading-tight  border border-[#737373]`}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Gallery;
