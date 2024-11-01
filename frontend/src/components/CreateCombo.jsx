import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { postComboApi } from "@/utils/useExerciseApi";

const CreateCombo = ({ category, setCategory }) => {
  const [comboName, setComboName] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [note, setNote] = useState("");

  const toggleDay = (day) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((d) => d !== day)
        : [...prevSelectedDays, day]
    );
  };

  const daysOfWeek = ["S", "M", "Tu", "W", "T", "F", "Sa"];

  const handleExerciseSelect = (e) => {
    const options = e.target.options;
    const selected = [];
    for (const option of options) {
      if (option.selected) selected.push(option.value);
    }
    setSelectedExercises(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToAdd = {
      comboName,
      exercises: selectedExercises,
      DayOfWeek: selectedDays,
      note,
    };
    const combo = await postComboApi(dataToAdd);

    setCategory((prev) => [...prev, combo.data]);

    setSelectedDays([]);
    setSelectedExercises([]);
    setComboName("");
    setNote("");
  };

  return (
    <Dialog>
      <DialogTrigger className="p-5 m-5 bg-[#8CAAE7] rounded-lg">
        Create Combo
      </DialogTrigger>
      <DialogContent className="bg-white rounded-lg p-6 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-[#8CAAE7] text-lg font-semibold">
              Create Combos
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Customize your exercise routine by selecting exercises, days, and
              adding notes.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 mb-4">
            <label className="text-[#8CAAE7] font-semibold mb-2 block">
              Combo Name:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8CAAE7]"
              value={comboName}
              onChange={(e) => setComboName(e.target.value)}
            />
          </div>

          <div className="mt-4 mb-4">
            <label className="text-[#8CAAE7] font-semibold mb-2 block">
              Select Exercises{" "}
              <span className="text-gray-400 text-xs">
                (ctrl + select for multiple options)
              </span>
            </label>
            <select
              multiple
              value={selectedExercises}
              onChange={handleExerciseSelect}
              className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8CAAE7]"
            >
              {category.map(
                (cat) =>
                  cat.name && (
                    <option key={cat._id} value={cat._id}>
                      {`${cat.name} ${cat.side}`}
                    </option>
                  )
              )}
            </select>
          </div>

          <div className="my-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[#8CAAE7] font-semibold">Day of Week</p>
              <button
                type="button"
                className="bg-[#8EA7E3] text-white px-3 py-1 rounded-lg"
                onClick={() => setSelectedDays(daysOfWeek)}
              >
                Select All
              </button>
            </div>

            <div className="flex justify-between gap-2">
              {daysOfWeek.map((day, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => toggleDay(day)}
                  className={`w-10 h-10 rounded-full font-semibold flex items-center justify-center
                ${
                  selectedDays.includes(day)
                    ? "bg-[#8CAAE7] text-white"
                    : "bg-[#F2F1F6] text-[#8CAAE7]"
                }
                transition-colors duration-200 ease-in-out
              `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="my-6">
            <p className="text-[#8CAAE7] font-semibold mb-2">Therapist Note</p>
            <textarea
              placeholder="Add Notes"
              className="w-full bg-[#F2F1F6] p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#8CAAE7]"
              onChange={(e) => setNote(e.target.value)}
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#8CAAE7] text-white py-2 rounded-lg font-semibold mt-4"
          >
            Create Combo
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCombo;
