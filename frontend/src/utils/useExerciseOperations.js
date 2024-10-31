import { useState } from "react";
import { addDuplicateApi, useExerciseApi } from "@/utils/useExerciseApi";
import { BASE_API_URL } from "@/utils/constants";

const useExerciseOperations = (
  category,
  setCategory,
  shouldDisableDuplicate
) => {
  const [exercises, setExercises] = useState({
    sets: category.sets,
    reps: category.reps,
    holdTime: category.holdTime,
    dumbbell: category.dumbbell,
    side: category.side,
  });

  const handleUpdateSide = (side) => {
    const updatedExercises = { ...exercises, side };
    setExercises(updatedExercises);
    useExerciseApi(category._id, updatedExercises);
  };

  const updateQuantity = (field, type) => {
    const updatedExercises = {
      ...exercises,
      [field]: exercises[field] + (type === "increment" ? 1 : -1),
    };
    setExercises(updatedExercises);
    useExerciseApi(category._id, updatedExercises);
  };

  const addDuplicate = async () => {
    if (!shouldDisableDuplicate) {
      try {
        const jsonResponse = await addDuplicateApi(category);
        setCategory((prev) => [...prev, jsonResponse]);
      } catch (error) {
        console.error("Error duplicating category:", error);
      }
    }
  };

  const removeCategory = async () => {
    try {
      setCategory((prevCategory) =>
        prevCategory.filter((cat) => cat._id !== category._id)
      );
      await fetch(`${BASE_API_URL}/api/categories/${category._id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return {
    exercises,
    handleUpdateSide,
    updateQuantity,
    addDuplicate,
    removeCategory,
  };
};

export default useExerciseOperations;
