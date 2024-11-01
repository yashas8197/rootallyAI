import { BASE_API_URL } from "./constants";
export const useExerciseApi = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/exercises/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update exercise data");
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    return null;
  }
};

export const postExerciseApi = async (dataBody) => {
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

export const addDuplicateApi = async (cat) => {
  const response = await fetch(`${BASE_API_URL}/api/duplicate-category`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(cat),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const clearExerciseApi = async (cat) => {
  const response = await fetch(`${BASE_API_URL}/api/clear-exercises`, {
    method: "DELETE",
  });

  return response.json();
};

export const getAllCombosApi = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/combos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch combos: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postComboApi = async (comboData) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/combo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comboData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
