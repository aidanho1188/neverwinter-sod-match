import React, { useState } from 'react';
import '../styles/GameBoard.css';
import useGameState from './useGameState';

function GameBoard() {
  const [gameStarted, setGameStarted] = useState(false);
  const [chosenLevel, setChosenLevel] = useState(1);
  const {
    currentQuestion,
    currentIndex,
    score,
    highScore,
    showAnswer,
    selectedOption,
    selectOption,
    nextQuestion,
    isFinished,
    totalQuestions,
    options,
    level,
    setLevel, // We'll add this to the hook
  } = useGameState();

  function handleSelect(option) {
    selectOption(option);
    setTimeout(() => {
      nextQuestion();
    }, 500);
  }

  function handleStart() {
    setLevel(chosenLevel);
    setGameStarted(true);
  }

  if (!gameStarted) {
    return (
      <div className="game-board start-screen">
        <h2>Neverwinter SOD Match</h2>
        <p>Choose your starting difficulty:</p>
        <div className="level-select">
          {[1,2,3,4,5,6,7].map((lvl) => (
            <button
              key={lvl}
              className={`level-btn${chosenLevel === lvl ? ' selected' : ''}`}
              onClick={() => setChosenLevel(lvl)}
            >
              Level {lvl}
            </button>
          ))}
        </div>
        <button className="next-btn" onClick={handleStart}>
          Start Game
        </button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="game-board">
        <h2>Quiz Complete!</h2>
        <p>Your score: {score}</p>
        <p>High score: {highScore}</p>
        <button
          className="next-btn"
          onClick={() => {
            setGameStarted(false);
            setChosenLevel(1);
            setLevel(1);
            window.location.reload(); // Full reset of game state
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className="game-board">
      <h2>Level {level} — Question {currentIndex + 1} of {totalQuestions}</h2>
      <div className="question-block">
        <p className="question">{currentQuestion.question.text}</p>
        {currentQuestion.question.image && (
          <img src={currentQuestion.question.image} alt="question visual" className="question-img" />
        )}
      </div>
      <div className="options">
        {options.map((option) => {
          let btnClass = 'option-btn';
          if (showAnswer) {
            if (option.text === currentQuestion.answer.text) btnClass += ' correct';
            else if (option.text === selectedOption?.text) btnClass += ' incorrect';
          }
          return (
            <button
              key={option.text}
              className={btnClass}
              onClick={() => !showAnswer && handleSelect(option)}
              disabled={showAnswer}
            >
              <span>{option.text}</span>
              {option.image && <img src={option.image} alt={option.text} className="option-img" />}
            </button>
          );
        })}
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default GameBoard;