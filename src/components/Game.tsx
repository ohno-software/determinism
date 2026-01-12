import { useState, useEffect } from 'react'
import type { Scenario } from '../types'

interface GameProps {
  onRestart: () => void
}

const Game: React.FC<GameProps> = ({ onRestart }) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    fetch('./scenarios.json')
      .then((res) => res.json())
      .then((data) => {
        // Shuffle scenarios
        const shuffled = [...data].sort(() => Math.random() - 0.5)
        setScenarios(shuffled)
      })
  }, [])

  const handleChoice = (choice: 'Deterministic' | 'Non-Deterministic') => {
    setSelectedAnswer(choice)
    setShowExplanation(true)
    
    const currentScenario = scenarios[currentIndex]
    if (choice === currentScenario.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setIsFinished(true)
    }
  }

  if (scenarios.length === 0) {
    return <div>Loading scenarios...</div>
  }

  if (isFinished) {
    const percentage = Math.round((score / scenarios.length) * 100)
    return (
      <div className="game-finished">
        <h2>Game Complete!</h2>
        <div className="final-score">
          Your Score: {score} / {scenarios.length} ({percentage}%)
        </div>
        <p style={{ maxWidth: '500px', lineHeight: '1.6' }}>
          {percentage >= 80
            ? "Excellent! You have a strong understanding of when to use AI versus traditional programming."
            : percentage >= 60
            ? "Good job! You're getting the hang of deterministic vs. non-deterministic problems."
            : "Keep learning! Understanding when to use AI is crucial for effective software development."}
        </p>
        <button className="restart-button" onClick={onRestart}>
          Play Again
        </button>
      </div>
    )
  }

  const currentScenario = scenarios[currentIndex]
  const isCorrect = selectedAnswer === currentScenario.correctAnswer

  return (
    <div className="game-container">
      <div className="progress-display">
        Question {currentIndex + 1} of {scenarios.length}
      </div>
      <div className="score-display">
        Score: {score}
      </div>

      <div className="scenario-display">
        {currentScenario.scenario}
      </div>

      {!showExplanation ? (
        <div className="choices-container">
          <button
            className="choice-button"
            onClick={() => handleChoice('Deterministic')}
          >
            Deterministic
          </button>
          <button
            className="choice-button"
            onClick={() => handleChoice('Non-Deterministic')}
          >
            Non-Deterministic
          </button>
        </div>
      ) : (
        <div className={`feedback-container ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-result">
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
          <div className="feedback-explanation">
            <strong>The answer is: {currentScenario.correctAnswer}</strong>
            <br /><br />
            {currentScenario.explanation}
          </div>
          <button className="next-button" onClick={handleNext}>
            {currentIndex < scenarios.length - 1 ? 'Next Scenario' : 'See Results'}
          </button>
        </div>
      )}
    </div>
  )
}

export default Game
