export default function Result({
  setIsQuizActive,
  setUserChoices,
  score,
  totalQuestions,
  setScore,
  setQuizFinished,
}: {
  setIsQuizActive: React.Dispatch<React.SetStateAction<boolean>>;
  setUserChoices: React.Dispatch<
    React.SetStateAction<{
      category: string;
      difficulty: string;
      nrOfQuestions: string;
    }>
  >;
  score: number;
  totalQuestions: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setQuizFinished: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const correctPercentage = ((score / totalQuestions) * 100).toFixed(1);
  return (
    <div className="flex flex-col border border-gray-400 rounded-xl items-center py-8 px-12 gap-4">
      {correctPercentage ? (
        <>
          <h2 className="font-semibold">Congratulations</h2>
          <p>You answered {correctPercentage}% of the questions correctly!</p>
        </>
      ) : (
        <h2 className="font-semibold">Try Again</h2>
      )}

      <button
        onClick={() => {
          setIsQuizActive(false);
          setQuizFinished(false);
          setScore(0);
          setUserChoices({ category: '', difficulty: '', nrOfQuestions: '' });
        }}
        className="bg-indigo-700 text-white text-xs font-bold py-2 px-10 rounded"
      >
        START ANOTHER QUIZ
      </button>
    </div>
  );
}
