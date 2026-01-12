import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
  const [gameStarted, setGameStarted] = useState(false)

  return (
    <div className="app-container">
      <header>
        <h1>Determinism</h1>
        <p className="subtitle">AI or Not AI?</p>
        <p className="powered-by">Learn when to use AI in decision making</p>
      </header>

      <main>
        {!gameStarted ? (
          <div>
            <p style={{ marginBottom: '2rem', maxWidth: '600px', lineHeight: '1.6' }}>
              Test your understanding of when to use AI versus traditional programming. 
              Decide if each scenario is deterministic (predictable, rule-based) or 
              non-deterministic (complex, pattern-based).
            </p>
            <button className="start-button" onClick={() => setGameStarted(true)}>
              Start Game
            </button>
          </div>
        ) : (
          <Game onRestart={() => setGameStarted(false)} />
        )}
      </main>

      <footer>
        <p>&copy; 2026 ohno! games</p>
      </footer>
    </div>
  )
}

export default App
