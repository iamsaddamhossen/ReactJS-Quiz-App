import React from "react";

export default function AnswerCard({
  answer,
  pickAnswer,
  correctAnswer,
  pickedAnswer,
}) {
  const IsRightAnswer = pickedAnswer && answer === correctAnswer;
  const isWrongAnswer =
    pickedAnswer && answer === pickedAnswer && pickedAnswer !== correctAnswer;
  const correctClass = IsRightAnswer ? "correct-answer" : "";
  const wrongClass = isWrongAnswer ? "incorrect-answer" : "";
  const disabledClass = pickedAnswer && "disabled-answer";

  return (
    <div
      className={`quiz-answer ${correctClass} ${wrongClass} ${disabledClass}`}
      onClick={() => pickAnswer(answer)}
    >
      {answer}
    </div>
  );
}
