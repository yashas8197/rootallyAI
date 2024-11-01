import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ComboDetail = ({ isOpen, setIsOpen, comboDetail }) => {
  console.log(comboDetail);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#F2F5FA]">
        <DialogHeader>
          <DialogTitle className="text-gray-400">
            {comboDetail?.comboName}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {comboDetail?.note}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {comboDetail?.DayOfWeek?.map((day, index) => (
              <span
                key={index}
                className="bg-[#8EA7E3] rounded-full text-white px-3 py-1"
              >
                {day}
              </span>
            ))}
          </div>

          {comboDetail?.exercises?.map((exercise) => (
            <div key={exercise.name} className="mb-3">
              <h3 className="text-gray-500 font-semibold">{exercise.name}</h3>
              {exercise.description && (
                <p className="text-gray-600">
                  Description: {exercise.description}
                </p>
              )}
              {exercise.sets && (
                <p className="text-gray-600">
                  Sets: <span className="text-black">{exercise.sets}</span>
                </p>
              )}
              {exercise.reps && (
                <p className="text-gray-600">
                  Reps: <span className="text-black">{exercise.reps}</span>
                </p>
              )}
              {exercise.holdTime && (
                <p className="text-gray-600">
                  Hold Time:
                  <span className="text-black">{exercise.holdTime}</span>
                </p>
              )}
              {exercise.dumbbell && (
                <p className="text-gray-600">
                  Dumbbell:
                  <span className="text-black">{exercise.dumbbell} kg</span>
                </p>
              )}
              {exercise.side && (
                <p className="text-gray-600">
                  Side: <span className="text-black">{exercise.side}</span>
                </p>
              )}
              {exercise.createdAt && (
                <p className="text-gray-500 text-xs">
                  Created At: {new Date(exercise.createdAt).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComboDetail;
