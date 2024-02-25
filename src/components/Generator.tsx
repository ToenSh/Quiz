interface GeneratorProps {
  userChoices: {
    category: string;
    difficulty: string;
    nrOfQuestions: string;
  };
  setUserChoices: React.Dispatch<
    React.SetStateAction<{
      category: string;
      difficulty: string;
      nrOfQuestions: string;
    }>
  >;
  setIsQuizActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Generator({
  userChoices,
  setUserChoices,
  setIsQuizActive,
}: GeneratorProps) {
  const handleUserChoices = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      category: e.currentTarget.category.value,
      difficulty: e.currentTarget.difficulty.value,
      nrOfQuestions: e.currentTarget.nrOfQuestions.value,
    };
    if (formData.category && formData.difficulty && formData.nrOfQuestions) {
      setUserChoices(formData);
      setIsQuizActive(true);
    }
  };

  return (
    <div className="flex flex-col border border-gray-400 rounded-xl py-8 px-12 gap-12 min-w-[500px]">
      <h1 className=" self-center font-semibold text-2xl">Generate Quiz</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUserChoices}>
        <label className="flex flex-col gap-2">
          Choose a category:
          <input
            type="text"
            name="category"
            id="category"
            className="border border-gray-400 rounded py-1 pl-1"
            defaultValue={userChoices.category}
          />
        </label>
        <label className="flex flex-col gap-2">
          Choose difficulty:
          <input
            type="text"
            name="difficulty"
            id="difficulty"
            className="border border-gray-400 rounded py-1 pl-1"
            defaultValue={userChoices.difficulty}
          />
        </label>
        <label className="flex flex-col gap-2">
          Enter number of questions:
          <input
            type="text"
            name="nrOfQuestions"
            id="nrOfQuestions"
            className="border border-gray-400 rounded py-1 pl-1"
            defaultValue={userChoices.nrOfQuestions}
          />
        </label>
        <button className="bg-indigo-700 text-white mt-4 px-12 py-1 self-center rounded-sm font-semibold">
          START
        </button>
      </form>
    </div>
  );
}
