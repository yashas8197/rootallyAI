import { useEffect, useRef, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { Reorder } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddExercise from "./AddExercise";
import { BASE_API_URL } from "@/utils/constants";
import CreateCombo from "./CreateCombo";
import { Button } from "./ui/button";
import { GrDrag } from "react-icons/gr";

const SCROLL_OFFSET = 10;
const SCROLL_SPEED = 10;

const ExerciseList = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_API_URL}/api/categories`);
        const json = await response.json();
        setCategory(json);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollOnDrag = (e, info) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const { y } = info.point;
    const { top, bottom } = scrollContainer.getBoundingClientRect();

    if (y < top + SCROLL_OFFSET) {
      scrollContainer.scrollTop -= SCROLL_SPEED;
    } else if (y > bottom - SCROLL_OFFSET) {
      scrollContainer.scrollTop += SCROLL_SPEED;
    }
  };

  const shouldDisableDuplicate = (ExerciseName) => {
    const matchingExercises = category.filter(
      (cat) => cat.name === ExerciseName
    );

    const hasBothSides =
      matchingExercises.some((cat) => cat.side === "Left") &&
      matchingExercises.some((cat) => cat.side === "Right");

    return hasBothSides;
  };

  const clearAllExercises = () => {
    setCategory([]);
  };

  return (
    <div className="border border-gray-400 w-full sm:w-3/4 mx-auto my-5 p-4 sm:p-5 rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-[#8CAAE7] font-bold text-lg sm:text-xl">
          Exercise Programme
        </h1>
        <Button onClick={clearAllExercises} variant="destructive">
          Clear All
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-[300px] sm:h-[500px]">
          <p className="text-xl sm:text-2xl text-[#8CAAE7]">Loading...</p>
        </div>
      ) : (
        <section ref={scrollContainerRef} className="mt-4">
          <ScrollArea className="h-[300px] sm:h-[500px]">
            <Reorder.Group axis="y" values={category} onReorder={setCategory}>
              {category.map((cat) => (
                <Reorder.Item key={cat._id} value={cat} onDrag={scrollOnDrag}>
                  <div className="flex items-center">
                    <GrDrag className="cursor-grab mr-2" />
                    <ExerciseCard
                      category={cat}
                      setCategory={setCategory}
                      shouldDisableDuplicate={shouldDisableDuplicate(cat.name)}
                    />
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </ScrollArea>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
            <AddExercise setCategory={setCategory} />
            <CreateCombo setCategory={setCategory} category={category} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ExerciseList;
