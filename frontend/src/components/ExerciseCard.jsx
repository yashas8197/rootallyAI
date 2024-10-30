import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LiaDumbbellSolid } from "react-icons/lia";
import { IoDuplicateSharp } from "react-icons/io5";
import { GrDrag } from "react-icons/gr";
import { Reorder } from "framer-motion";

const ExerciseCard = ({ category, setCategory }) => {
  const [activeButton, setActiveButton] = useState(null);

  const { name } = category;

  const addDuplicate = async (cat) => {
    const response = await fetch(
      "https://rootally-ai.vercel.app/api/duplicate-category",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(cat),
      }
    );
    const json = await response.json();
    setCategory((prev) => [...prev, json]);
  };

  const handleClick = (button) => {
    setActiveButton(button);
  };

  const handleQuantityMinus = (item) => {};

  const handleQuantityPlus = (item) => {};

  const handleDuplicate = (cat) => {
    addDuplicate(cat);
  };

  return (
    <div className="flex items-center justify-center">
      <GrDrag className="" />

      <div className="bg-[#F2F5FA] w-full  p-3 m-3 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-400 font-semibold">{name}</h2>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white border border-black inline rounded-md">
              <button
                variant="outline"
                className={`${
                  activeButton === "left"
                    ? "bg-[#8EA7E3] text-white"
                    : "bg-white text-gray-400"
                } px-5 py-0.5 rounded-md`}
                onClick={() => handleClick("left")}
              >
                Left
              </button>
              <button
                variant="outline"
                className={`${
                  activeButton === "right"
                    ? "bg-[#8EA7E3] text-white"
                    : "bg-white text-gray-400"
                } px-5 py-0.5 rounded-md`}
                onClick={() => handleClick("right")}
              >
                Right
              </button>
            </div>
            <div>
              <button
                onClick={() => handleDuplicate(category)}
                className="bg-[#8EA7E3] flex items-center gap-2 text-white py-1 rounded-2xl px-2"
              >
                <IoDuplicateSharp /> Duplicate
              </button>
            </div>
            <RiDeleteBin6Fill className="text-2xl text-gray-400" />
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="flex items-center bg-white p-2 rounded shadow-sm">
            <span className="text-lg mr-2">Sets</span>
            <FaMinusSquare
              className="text-xl cursor-pointer hover:text-gray-600"
              onClick={() => handleQuantityMinus(10)}
            />
            <p className="px-2">10</p>
            <FaPlusSquare
              className="text-xl cursor-pointer hover:text-gray-600"
              onClick={() => handleQuantityPlus(10)}
            />
          </div>
          <div className="flex items-center bg-white p-2 rounded shadow-sm">
            <span className="text-lg mr-2">Reps</span>
            <FaMinusSquare
              className="text-xl cursor-pointer hover:text-gray-600"
              onClick={() => handleQuantityMinus(10)}
            />
            <p className="px-2">10</p>
            <FaPlusSquare
              className="text-xl cursor-pointer hover:text-gray-600"
              onClick={() => handleQuantityPlus(10)}
            />
          </div>
          <div className="flex items-center bg-white p-2 rounded shadow-sm">
            <span className="text-lg mr-2">Hold Time</span>
            <FaMinusSquare
              className="text-xl cursor-pointer hover:text-gray-600"
              onClick={() => handleQuantityMinus(10)}
            />
            <p className="px-2">10</p>
            <FaPlusSquare
              className="text-xl cursor-pointer hover:text-gray-600"
              onClick={() => handleQuantityPlus(10)}
            />
          </div>
          <div className="flex items-center bg-white p-2 rounded shadow-sm">
            <span className="text-lg mr-2">
              <LiaDumbbellSolid className="text-xl" />
            </span>
            <FaMinusSquare
              className="text-xl cursor-pointer hover:text-gray-600"
              onClick={() => handleQuantityMinus(10)}
            />
            <p className="px-2">10</p>
            <FaPlusSquare
              className="text-xl cursor-pointer hover:text-gray-600"
              onClick={() => handleQuantityPlus(10)}
            />
            <span className="font-semibold m-1">Kg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
