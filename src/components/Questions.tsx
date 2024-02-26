import { useState } from 'react';
import Question from './Question';
import { useParams } from 'react-router-dom';
import data from '../data.json';

export default function Questions() {
  const { category: categoryName, difficulty, nrOfQuestions } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  console.log(score);

  const questionElements = data.categories
    .filter((category) => category.name === categoryName)
    .flatMap((category) =>
      category.questions
        .filter((question) => question.dificulty === difficulty)
        .slice(0, Number(nrOfQuestions))
        .map((question, index, array) => {
          const totalQuestions = array.length;
          return (
            <Question
              key={index}
              correctAnswers={question.correct_answers}
              title={question.title}
              answers={question.answers}
              setCurrentQuestion={setCurrentQuestion}
              currentQuestion={currentQuestion}
              totalQuestions={totalQuestions}
              type={question.type}
              score={score}
              setScore={setScore}
            />
          );
        })
    );

  const totalQuestions = questionElements.length;
  const sliderWidth = ((currentQuestion + 1) / totalQuestions) * 100 + '%';

  return (
    <div className="flex flex-col border border-gray-400 rounded-xl py-8 px-12 gap-8 w-[500px]">
      <div className="flex items-center gap-4">
        <div className="bg-gray-300 w-full h-4 rounded-lg width-transition">
          <div
            className="bg-indigo-700 h-4 rounded-lg transition-all duration-300 ease-in"
            style={{ width: sliderWidth }}
          ></div>
        </div>
        <span className="text-sm">
          {currentQuestion + 1}/{totalQuestions}
        </span>
      </div>
      {questionElements[currentQuestion]}
    </div>
  );
}
