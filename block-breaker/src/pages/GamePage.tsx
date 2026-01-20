import type { ReactElement } from 'react'
import Game from '../components/Game'
import '../styles/game.css'

const GamePage = (): ReactElement => {
  return (
    <main className="game-page">
      <section className="game-card">
        <header className="game-header">
          <p className="game-kicker">React Router v7 + Canvas</p>
          <h1>Block Breaker</h1>
          <p className="game-instructions">
            Move the paddle with the left/right arrow keys. Press Space after
            Game Over or Clear to restart.
          </p>
        </header>
        <div className="game-canvas-wrapper">
          <Game />
        </div>
      </section>
    </main>
  )
}

export default GamePage
