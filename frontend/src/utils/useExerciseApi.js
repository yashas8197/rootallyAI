const useExerciseApi = async (id, updatedData) => {
  try {
    const response = await fetch(
      `https://rootally-ai.vercel.app/api/exercises/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update exercise data");
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    return null;
  }
};

export default useExerciseApi;
