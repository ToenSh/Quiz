import { useNavigate } from 'react-router-dom';

export default function Generator() {
  const navigate = useNavigate();

  function onStart(e: React.FormEvent<HTMLFormElement>) {
    const formData = {
      category: e.currentTarget.category.value,
      difficulty: e.currentTarget.difficulty.value,
      nrOfQuestions: e.currentTarget.nrOfQuestions.value,
    };
    if (formData.category && formData.difficulty && formData.nrOfQuestions) {
      navigate(
        `/quiz/${formData.category}/${formData.difficulty}/${formData.nrOfQuestions}`
      );
    } else {
      console.error('Please fill in all fields');
    }
  }

  return (
    <div className="flex flex-col border border-gray-400 rounded-xl py-8 px-12 gap-12 min-w-[500px]">
      <h1 className=" self-center font-semibold text-2xl">Generate Quiz</h1>
      <form className="flex flex-col gap-4" onSubmit={onStart}>
        <label className="flex flex-col gap-2">
          Choose a category:
          <input
            type="text"
            name="category"
            id="category"
            className="border border-gray-400 rounded py-1 pl-1"
            defaultValue=""
          />
        </label>
        <label className="flex flex-col gap-2">
          Choose difficulty:
          <input
            type="text"
            name="difficulty"
            id="difficulty"
            className="border border-gray-400 rounded py-1 pl-1"
            defaultValue=""
          />
        </label>
        <label className="flex flex-col gap-2">
          Enter number of questions:
          <input
            type="text"
            name="nrOfQuestions"
            id="nrOfQuestions"
            className="border border-gray-400 rounded py-1 pl-1"
            defaultValue=""
          />
        </label>
        <button className="bg-indigo-700 text-white mt-4 px-12 py-1 self-center rounded-sm font-semibold">
          START
        </button>
      </form>
    </div>
  );
}
