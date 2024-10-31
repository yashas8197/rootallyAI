import { BASE_API_URL } from "./constants";

const postExerciseApi = async (dataBody) => {
  const response = await fetch(`${BASE_API_URL}/api/exercises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export default postExerciseApi;
