import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoDuplicateSharp } from "react-icons/io5";
import { LiaDumbbellSolid } from "react-icons/lia";
import useExerciseOperations from "@/utils/useExerciseOperations";

const ExerciseCard = ({ category, setCategory, shouldDisableDuplicate }) => {
  const {
    exercises,
    handleUpdateSide,
    updateQuantity,
    addDuplicate,
    removeCategory,
  } = useExerciseOperations(category, setCategory, shouldDisableDuplicate);

  return (
    <div className="bg-[#F2F5FA] w-full p-3 m-3 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-lg sm:text-xl text-gray-400 font-semibold">
          {category.name}
        </h2>
        <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
          <div className="p-2 bg-white border border-black rounded-md flex flex-wrap gap-1">
            <button
              onClick={() => handleUpdateSide("Left")}
              disabled={shouldDisableDuplicate}
              className={`px-4 py-1 rounded-md ${
                exercises.side === "Left"
                  ? "bg-[#8CAAE7] text-white"
                  : "bg-white text-gray-400"
              } ${
                shouldDisableDuplicate ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Left
            </button>
            <button
              onClick={() => handleUpdateSide("Right")}
              disabled={shouldDisableDuplicate}
              className={`px-4 py-1 rounded-md ${
                exercises.side === "Right"
                  ? "bg-[#8CAAE7] text-white"
                  : "bg-white text-gray-400"
              } ${
                shouldDisableDuplicate ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Right
            </button>
          </div>
          <button
            onClick={addDuplicate}
            disabled={shouldDisableDuplicate}
            className={`bg-[#8CAAE7] flex items-center gap-2 text-white py-1 rounded-2xl px-2 ${
              shouldDisableDuplicate
                ? "opacity-50 cursor-not-allowed"
                : "cursor-copy"
            }`}
          >
            <IoDuplicateSharp /> Duplicate
          </button>
          <RiDeleteBin6Fill
            onClick={removeCategory}
            className="text-2xl text-gray-400 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-5">
        {["sets", "reps", "holdTime", "dumbbell"].map(
          (field) =>
            exercises[field] > 0 && (
              <div
                key={field}
                className="flex items-center bg-white p-2 rounded shadow-sm w-full sm:w-auto mb-2 sm:mb-0"
              >
                <span className="text-lg mr-2">
                  {field === "dumbbell" ? (
                    <LiaDumbbellSolid className="inline text-xl mx-1" />
                  ) : (
                    field
                  )}
                </span>
                <FaMinusSquare
                  className="text-xl cursor-pointer hover:text-gray-600"
                  onClick={() => updateQuantity(field, "decrement")}
                />
                <p className="px-2">{exercises[field]}</p>
                <FaPlusSquare
                  className="text-xl cursor-pointer hover:text-gray-600"
                  onClick={() => updateQuantity(field, "increment")}
                />
                {field === "dumbbell" && <span>Kgs</span>}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ExerciseCard;
