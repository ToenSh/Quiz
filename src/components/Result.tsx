import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const score = state.score;

  return (
    <div className="flex flex-col border border-gray-400 rounded-xl items-center py-8 px-12 gap-4">
      {score ? (
        <>
          <h2 className="font-semibold">Congratulations</h2>
          <p>
            You answered {Number(score).toFixed(1)} % of the questions
            correctly!
          </p>
        </>
      ) : (
        <h2 className="font-semibold">Try Again</h2>
      )}

      <button
        onClick={() => navigate('/')}
        className="bg-indigo-700 text-white text-xs font-bold py-2 px-10 rounded"
      >
        START ANOTHER QUIZ
      </button>
    </div>
  );
}
