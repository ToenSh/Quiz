import React, { useState } from 'react';

export default function Answer({
  setSelectedAnswers,
  answer,
  letter,
}: {
  setSelectedAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  answer: string;
  letter: string;
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => {
        setIsActive((prevIsActive) => !prevIsActive);
        setSelectedAnswers((prevSelectedAnswers) => {
          const answerIndex = prevSelectedAnswers.indexOf(answer);
          if (answerIndex === -1) {
            return [...prevSelectedAnswers, answer];
          } else {
            return prevSelectedAnswers.filter(
              (_, index) => index !== answerIndex
            );
          }
        });
      }}
      className={`${
        isActive ? 'bg-indigo-700 text-white' : 'bg-white'
      } border border-gray-300 rounded-md py-2 text-sm text-left pl-2`}
    >
      <span
        className={`${
          isActive ? 'bg-indigo-700' : 'bg-gray-300'
        } rounded-full p-1 mr-1 inline-flex justify-center items-center w-8`}
      >
        {letter}
      </span>{' '}
      {answer}
    </button>
  );
}
