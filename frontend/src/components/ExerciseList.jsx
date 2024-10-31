import { useEffect, useRef, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { Reorder } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddExercise from "./AddExercise";
import { BASE_API_URL } from "@/utils/constants";

const SCROLL_OFFSET = 50;
const SCROLL_SPEED = 10;

const ExerciseList = () => {
  const [category, setCategory] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/categories`);
        const json = await response.json();
        setCategory(json);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
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

  return (
    <div className="border border-gray-400 w-3/4 mx-auto my-5 p-5 rounded-lg">
      <h1 className="text-[#8CAAE7] font-bold text-xl">Exercise Programme</h1>

      <section ref={scrollContainerRef}>
        <ScrollArea className="h-[500px]">
          <Reorder.Group axis="y" values={category} onReorder={setCategory}>
            {category.map((cat) => (
              <Reorder.Item key={cat._id} value={cat} onDrag={scrollOnDrag}>
                <ExerciseCard
                  category={cat}
                  setCategory={setCategory}
                  shouldDisableDuplicate={shouldDisableDuplicate(cat.name)}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </ScrollArea>
        <AddExercise setCategory={setCategory} />
      </section>
    </div>
  );
};

export default ExerciseList;
