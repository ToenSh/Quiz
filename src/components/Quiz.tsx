import Generator from './Generator';
import Result from './Result';
import { Route, Routes } from 'react-router-dom';
import Questions from './Questions';

export default function Quiz() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <Routes>
        <Route path="/" element={<Generator />} />
        <Route path="/result" element={<Result />} />
        <Route
          path="/quiz/:category/:difficulty/:nrOfQuestions"
          element={<Questions />}
        />
      </Routes>
    </main>
  );
}
