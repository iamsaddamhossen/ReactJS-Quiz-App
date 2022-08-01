import React from 'react'

export default function ScoreCard({totalScore, resetQuiz}) {
  return (
    <div className='result'>
        <p style={{fontSize: '30px', color: "#fff"}}>Quize Score:  <strong>{totalScore}</strong></p>
        <button onClick={resetQuiz} className='btn restart-btn' style={{cursor: 'pointer'}}>Reset Quiz</button>
    </div>
  )
}
