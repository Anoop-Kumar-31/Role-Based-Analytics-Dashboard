import React, { useState, useEffect } from "react";
import { Pencil, MoveVertical } from "lucide-react";

import Table from "../../../components/Table";
import PopUp from "./PopUp"; // <-- Import your popup component

import mockData from './mockData.json'

// // sample JSON structure taken
// [
//   {name:"",addres:"", date:""},
//   {name:"",addres:"", date:""}
// ]

const HeadingData={
  th:[
    {
      title: "Restaurant Name"
    }, {
      title: "Address",
    }, {
      title: "Update on",
    }, {
      title:"Actions",
  }],
}


const Locations = () => {
  const [popUp, setPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track which restaurant is being edited
  const [restaurants] = useState(mockData);

  // Function to handle edit action
  const handleEdit = (e, index) => {
    e.stopPropagation();
    setEditIndex(index);
    setPopup(true);
  };


  return (
    <div className="bg-[var(--background)] flex flex-col items-center h-fit p-5 max-md:p-1">
      {popUp ?
        <PopUp
          onClose={() => setPopup(false)}
          restaurant={restaurants[editIndex]}
        />
        :
        <>
          {/* Top Section */}
          <section className="flex flex-col justify-between bg-[var(--background)] items-center w-full gap-[15px]  py-2">
            <div className="flex flex-row justify-between  items-center w-[100%]">
              <h1 className="text-3xl font-bold text-[var(--primary-black)] self-center">
                Restaurants&apos; Location
              </h1>
            </div>
          </section>

          {/* Table Section */}
          <section className=" py-[30px] pb-[120px] w-[100%] overflow-scroll flex justify-start max-md:px-1">
              <Table 
                HeadingData={HeadingData}
                bodyData={restaurants}
                actionData={[
                  ({rowIndex }) => (
                    <Pencil
                      size={16}
                      strokeWidth={3}
                      color="#559955"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleEdit(e, rowIndex)}
                    />
                  ),
                ]}
              />
          </section>
        </>
      }
    </div>
  );
};

export default Locations;