import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiaDumbbellSolid } from "react-icons/lia";
import { FaHourglassHalf, FaListOl, FaCheck } from "react-icons/fa";
import postExerciseApi from "@/utils/postExerciseApi";

const AddExercise = ({ setCategory }) => {
  const [exerciseData, setExerciseData] = useState({
    exerciseName: "",
    exerciseDesc: "",
    exerciseSide: "",
    isDumbbellChecked: false,
    isHoldTimeChecked: false,
    isRepsChecked: false,
    isSetsChecked: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    postExercise();
  };

  const postExercise = async () => {
    const {
      exerciseName,
      exerciseDesc,
      exerciseSide,
      isDumbbellChecked,
      isHoldTimeChecked,
      isRepsChecked,
      isSetsChecked,
    } = exerciseData;
    const dataBody = {
      name: exerciseName,
      description: exerciseDesc,
      side: exerciseSide,
    };

    if (isRepsChecked) dataBody.reps = 1;
    if (isSetsChecked) dataBody.sets = 1;
    if (isDumbbellChecked) dataBody.dumbbell = 1;
    if (isHoldTimeChecked) dataBody.holdTime = 1;

    try {
      const newExercise = await postExerciseApi(dataBody);
      setCategory((prev) => [...prev, newExercise]);

      setExerciseData({
        exerciseName: "",
        exerciseDesc: "",
        exerciseSide: "",
        isDumbbellChecked: false,
        isHoldTimeChecked: false,
        isRepsChecked: false,
        isSetsChecked: false,
      });
    } catch (error) {
      console.error("Error posting exercise:", error);
    }
  };

  const handleChange = (field, value) => {
    setExerciseData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger className="p-5 m-5 bg-[#8CAAE7] rounded-lg">
        Add Exercise
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Exercise</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new exercise to your program.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exercise Name
            </label>
            <input
              type="text"
              value={exerciseData.exerciseName}
              onChange={(e) => handleChange("exerciseName", e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exercise Description
            </label>
            <input
              type="text"
              value={exerciseData.exerciseDesc}
              onChange={(e) => handleChange("exerciseDesc", e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Side
            </label>
            <div className="flex space-x-4 mt-1">
              <label>
                <input
                  type="radio"
                  value="Left"
                  checked={exerciseData.exerciseSide === "Left"}
                  onChange={() => handleChange("exerciseSide", "Left")}
                  required
                  className="mr-1"
                />
                Left
              </label>
              <label>
                <input
                  type="radio"
                  value="Right"
                  checked={exerciseData.exerciseSide === "Right"}
                  onChange={() => handleChange("exerciseSide", "Right")}
                  required
                  className="mr-1"
                />
                Right
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <div
              onClick={() =>
                handleChange(
                  "isDumbbellChecked",
                  !exerciseData.isDumbbellChecked
                )
              }
              className={`cursor-pointer ${
                exerciseData.isDumbbellChecked ? "text-blue-500" : ""
              }`}
            >
              <LiaDumbbellSolid className="inline text-xl mx-2" />
              Dumbbell
            </div>
            <div
              onClick={() =>
                handleChange(
                  "isHoldTimeChecked",
                  !exerciseData.isHoldTimeChecked
                )
              }
              className={`cursor-pointer ${
                exerciseData.isHoldTimeChecked ? "text-blue-500" : ""
              }`}
            >
              <FaHourglassHalf className="inline text-xl mx-2" />
              Hold Time
            </div>
            <div
              onClick={() =>
                handleChange("isRepsChecked", !exerciseData.isRepsChecked)
              }
              className={`cursor-pointer ${
                exerciseData.isRepsChecked ? "text-blue-500" : ""
              }`}
            >
              <FaListOl className="inline text-xl mx-2" />
              Reps
            </div>
            <div
              onClick={() =>
                handleChange("isSetsChecked", !exerciseData.isSetsChecked)
              }
              className={`cursor-pointer ${
                exerciseData.isSetsChecked ? "text-blue-500" : ""
              }`}
            >
              <FaCheck className="inline text-xl mx-2" />
              Sets
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-2 bg-[#8CAAE7] text-white rounded-lg hover:bg-[#7A9BC4]"
          >
            Add Exercise
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExercise;
