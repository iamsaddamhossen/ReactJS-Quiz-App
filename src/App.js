import { useState } from "react";
import QuestionCard from "./QuestionCard";
import shuffle from "./utils";
import ScoreCard from "./ScoreCard";

function App() {
  const [quizzes, setQuizzes] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentAnswers, setCurrentAnswers] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [pickedAnswer, setPickedAnswer] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [endGame, setEndGame] = useState(false);

  const fetchQuiz = async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"
    );
    const { results } = await res.json();
    setQuizzes(results);
    setLoaded(true);
    setStartQuiz(true);

    // getting all answers
    const initialQuestion = results[currentQuestionIndex];
    // const answers = [initialQuestionIndex.correct_answer, ...initialQuestionIndex.incorrect_answers];
    setCurrentAnswers(shuffle(initialQuestion));
    setCorrectAnswer(initialQuestion.correct_answer);
  };

  const navigateNext = () => {
    let currentQuizIndex = currentQuestionIndex + 1;
    const validQuestionIndex = currentQuizIndex < quizzes.length;
    if (validQuestionIndex) {
      setCurrentQuestionIndex(currentQuizIndex);
      const question = quizzes[currentQuizIndex];
      setCurrentAnswers(shuffle(question));
      // reset picked answer
      setPickedAnswer(null);
      // setting correct answer on question navigation
      setCorrectAnswer(question.correct_answer);
    } else {
      setEndGame(true);
      console.log("END");
    }
  };

  const pickAnswer = (answer) => {
    setPickedAnswer(answer);
    if (answer === correctAnswer) {
      setTotalScore((prevScore) => prevScore + 1);
    }
    console.log(answer);
  };
  const resetQuiz = () => {
    setQuizzes(null);
    setLoaded(false);
    setCorrectAnswer(null);
    setEndGame(false);
    setStartQuiz(false);
    setPickedAnswer(null);
    setTotalScore(0);
    setCurrentQuestionIndex(0);
  }

  return (
    <>
    {endGame && <ScoreCard totalScore={totalScore} resetQuiz={resetQuiz}/>}
      {!startQuiz && (
        <button
          onClick={fetchQuiz}
          style={{ display: "block", margin: "400px auto", cursor: "pointer", border: '1px solid #ddd' }}
        >
          Start Quiz
        </button>
      )}
      <div className="container">
        {loaded && !endGame && (
          <QuestionCard
            quiz={quizzes[currentQuestionIndex]}
            currentAnswers={currentAnswers}
            currentQuestionIndex={currentQuestionIndex}
            quizzes={quizzes}
            navigateNext={navigateNext}
            pickAnswer={pickAnswer}
            correctAnswer={correctAnswer}
            pickedAnswer={pickedAnswer}
          />
        )}
      </div>
    </>
  );
}

export default App;
