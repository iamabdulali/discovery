import React, { useContext, useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import Gallery from "./Gallery";
import TableView from "./TableView";
import { Context } from "../main";

const Viewer = () => {
  const [view, setView] = useState(false);
  const { images } = useContext(Context);

  if (images.length == 0) {
    return <div></div>;
  }

  return (
    <div className="mx-8 xl:mx-36 my-36">
      <div className="icons-div text-right flex items-center justify-end mb-5">
        <FiList
          size={24}
          className="mr-3 cursor-pointer"
          title="List View"
          onClick={() => setView(true)}
        />

        <FiGrid
          onClick={() => setView(false)}
          size={24}
          className=" cursor-pointer"
          title="Grid View"
        />
      </div>

      {view ? (
        <TableView />
      ) : (
        <>
          <Gallery />
        </>
      )}
    </div>
  );
};

export default Viewer;
