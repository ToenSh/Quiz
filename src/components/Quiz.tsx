import { useState } from 'react';
import Generator from './Generator';
import Question from './Question';
import data from '../data.json';
import Result from './Result';

export default function Quiz() {
  const [userChoices, setUserChoices] = useState({
    category: '',
    difficulty: '',
    nrOfQuestions: '',
  });
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  console.log(score);

  const questionElements = data.categories
    .filter((category) => category.name === userChoices.category)
    .flatMap((category) =>
      category.questions
        .filter((question) => question.dificulty === userChoices.difficulty)
        .slice(0, Number(userChoices.nrOfQuestions))
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
              setQuizFinished={setQuizFinished}
              totalQuestions={totalQuestions}
              type={question.type}
              setScore={setScore}
              isQuizActive={isQuizActive}
            />
          );
        })
    );

  return (
    <main className="flex items-center justify-center min-h-screen">
      {!isQuizActive ? (
        <Generator
          userChoices={userChoices}
          setUserChoices={setUserChoices}
          setIsQuizActive={setIsQuizActive}
        />
      ) : quizFinished ? (
        <Result
          setIsQuizActive={setIsQuizActive}
          setQuizFinished={setQuizFinished}
          setUserChoices={setUserChoices}
          totalQuestions={questionElements.length}
          score={score}
          setScore={setScore}
        />
      ) : (
        <>{questionElements[currentQuestion]}</>
      )}
    </main>
  );
}
