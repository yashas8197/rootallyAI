import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoDuplicateSharp } from "react-icons/io5";
import { GrDrag } from "react-icons/gr";
import useExerciseApi from "@/utils/useExerciseApi";
import { BASE_API_URL } from "@/utils/constants";

const ExerciseCard = ({ category, setCategory, shouldDisableDuplicate }) => {
  const [exercises, setExercises] = useState({
    sets: category.sets,
    reps: category.reps,
    holdTime: category.holdTime,
    dumbbell: category.dumbbell,
    side: category.side,
  });

  const { name } = category;

  const addDuplicate = async (cat) => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/duplicate-category`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(cat),
      });
      const json = await response.json();

      setCategory((prev) => [...prev, json]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (side) => {
    const updatedExercises = {
      ...exercises,
      side: side,
    };
    setExercises(updatedExercises);
    const updatedData = {
      ...updatedExercises,
    };
    useExerciseApi(category._id, updatedData);
  };

  const handleQuantityMinus = (field) => {
    const updatedExercises = {
      ...exercises,
      [field]: exercises[field] - 1,
    };
    setExercises(updatedExercises);
    const updatedData = {
      ...updatedExercises,
    };
    useExerciseApi(category._id, updatedData);
  };

  const handleQuantityPlus = (field) => {
    const updatedExercises = {
      ...exercises,
      [field]: exercises[field] + 1,
    };
    setExercises(updatedExercises);
    const updatedData = {
      ...updatedExercises,
    };
    useExerciseApi(category._id, updatedData);
  };

  const handleDuplicate = (cat) => {
    addDuplicate(cat);
  };

  const removeCategory = async (id) => {
    try {
      setCategory((prevCategory) =>
        prevCategory.filter((cat) => cat._id !== id)
      );
      await fetch(`${BASE_API_URL}/api/categories/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <GrDrag className="cursor-grab" />

      <div className="bg-[#F2F5FA] w-full  p-3 m-3 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-400 font-semibold">{name}</h2>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white border border-black inline rounded-md">
              <button
                variant="outline"
                className={`${
                  exercises.side?.toLowerCase() === "left"
                    ? "bg-[#8CAAE7] text-white"
                    : "bg-white text-gray-400"
                } px-5 py-0.5 rounded-md`}
                onClick={() => handleClick("Left")}
              >
                Left
              </button>
              <button
                variant="outline"
                className={`${
                  exercises.side?.toLowerCase() === "right"
                    ? "bg-[#8CAAE7] text-white"
                    : "bg-white text-gray-400"
                } px-5 py-0.5 rounded-md`}
                onClick={() => handleClick("Right")}
              >
                Right
              </button>
            </div>
            <div>
              <button
                onClick={() => handleDuplicate(category)}
                disabled={shouldDisableDuplicate}
                className={`bg-[#8CAAE7] flex items-center gap-2 text-white py-1 rounded-2xl px-2 ${
                  shouldDisableDuplicate
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-copy"
                }`}
              >
                <IoDuplicateSharp /> Duplicate
              </button>
            </div>
            <RiDeleteBin6Fill
              onClick={() => removeCategory(category._id)}
              className="text-2xl text-gray-400 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between mt-5">
          {["sets", "reps", "holdTime", "dumbbell"].map(
            (field) =>
              exercises[field] > 0 && (
                <div
                  key={field}
                  className="flex items-center bg-white p-2 rounded shadow-sm"
                >
                  <span className="text-lg mr-2">{field}</span>
                  <FaMinusSquare
                    className="text-xl cursor-pointer hover:text-gray-600"
                    onClick={() => handleQuantityMinus(field)}
                  />
                  <p className="px-2">{exercises[field]}</p>
                  <FaPlusSquare
                    className="text-xl cursor-pointer hover:text-gray-600"
                    onClick={() => handleQuantityPlus(field)}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
