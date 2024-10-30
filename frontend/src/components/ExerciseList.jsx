import { useEffect, useRef, useState } from "react";
import ExerciseCard from "./ExerciseCard";
import { Reorder } from "framer-motion";

const ExerciseList = () => {
  const [category, setCategory] = useState([]);
  const scrollContainerRef = useRef(null);

  const fetchData = async () => {
    const response = await fetch(
      "https://rootally-ai.vercel.app/api/categories"
    );
    const json = await response.json();
    setCategory(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDrag = (e, info) => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const { y } = info.point;
    const { top, bottom } = scrollContainer.getBoundingClientRect();
    const scrollSpeed = 10;

    if (y < top + 50) {
      scrollContainer.scrollTop -= scrollSpeed;
    } else if (y > bottom - 50) {
      scrollContainer.scrollTop += scrollSpeed;
    }
  };

  return (
    <div className="border border-gray-400 w-3/4 mx-auto my-5 p-5 rounded-lg">
      <h1 className="text-[#8CAAE7] font-bold text-xl">Exercise Programme</h1>

      <section
        ref={scrollContainerRef}
        className="overflow-y-auto max-h-[500px]"
      >
        <Reorder.Group axis="y" values={category} onReorder={setCategory}>
          {category.map((cat) => (
            <Reorder.Item key={cat._id} value={cat} onDrag={handleDrag}>
              <ExerciseCard category={cat} setCategory={setCategory} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </section>
    </div>
  );
};

export default ExerciseList;
