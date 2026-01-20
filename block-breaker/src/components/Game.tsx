import type { ReactElement } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../game/constants'
import {
  checkBlocksCollision,
  checkPaddleCollision,
  checkWallCollision,
  createInitialBall,
  createInitialPaddle,
  initBlocks,
  isGameClear,
  isGameOver,
  updateBall,
  updatePaddle,
} from '../game/gameLogic'
import type { GameData, GameState } from '../game/types'

const createInitialGameData = (): GameData => {
  return {
    paddle: createInitialPaddle(),
    ball: createInitialBall(),
    blocks: initBlocks(),
    gameState: 'playing',
  }
}

const drawMessage = (ctx: CanvasRenderingContext2D, message: string): void => {
  ctx.save()
  ctx.fillStyle = 'rgba(15, 23, 42, 0.75)'
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  ctx.fillStyle = '#f8fafc'
  ctx.font = 'bold 48px Segoe UI, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(message, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
  ctx.font = '16px Segoe UI, sans-serif'
  ctx.fillText('Press Space to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 48)
  ctx.restore()
}

const drawGame = (ctx: CanvasRenderingContext2D, gameData: GameData): void => {
  console.log('Drawing game', { gameState: gameData.gameState, ballY: gameData.ball.y })
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  ctx.fillStyle = '#38bdf8'
  ctx.fillRect(
    gameData.paddle.x,
    gameData.paddle.y,
    gameData.paddle.width,
    gameData.paddle.height,
  )

  ctx.beginPath()
  ctx.fillStyle = '#f8fafc'
  ctx.arc(gameData.ball.x, gameData.ball.y, gameData.ball.radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()

  ctx.fillStyle = '#f97316'
  for (const block of gameData.blocks) {
    if (block.destroyed) {
      continue
    }

    ctx.fillRect(block.x, block.y, block.width, block.height)
  }

  if (gameData.gameState === 'gameover') {
    drawMessage(ctx, 'Game Over')
  }

  if (gameData.gameState === 'clear') {
    drawMessage(ctx, 'Clear!')
  }
}

const updateGameState = (gameData: GameData): GameState => {
  updatePaddle(gameData.paddle, CANVAS_WIDTH)
  updateBall(gameData.ball)
  checkWallCollision(gameData.ball, CANVAS_WIDTH)
  checkPaddleCollision(gameData.ball, gameData.paddle)
  checkBlocksCollision(gameData.ball, gameData.blocks)

  if (isGameOver(gameData.ball, CANVAS_HEIGHT)) {
    return 'gameover'
  }

  if (isGameClear(gameData.blocks)) {
    return 'clear'
  }

  return 'playing'
}

const Game = (): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const isRunningRef = useRef(false)
  const gameDataRef = useRef<GameData>(createInitialGameData())

  const startLoop = useCallback((): void => {
    if (isRunningRef.current) {
      console.log('Game loop already running')
      return
    }

    console.log('Starting game loop')
    isRunningRef.current = true

    const step = (): void => {
      console.log('Step function called')
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')

      if (!canvas || !context) {
        console.error('Canvas or context not available')
        isRunningRef.current = false
        return
      }

      const gameData = gameDataRef.current

      if (gameData.gameState === 'playing') {
        gameData.gameState = updateGameState(gameData)
      }

      drawGame(context, gameData)

      if (gameData.gameState === 'playing') {
        animationFrameRef.current = window.requestAnimationFrame(step)
      } else {
        console.log(`Game ended with state: ${gameData.gameState}`)
        isRunningRef.current = false
      }
    }

    animationFrameRef.current = window.requestAnimationFrame(step)
  }, [])

  const resetGame = useCallback((): void => {
    gameDataRef.current = createInitialGameData()
    isRunningRef.current = false
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
    startLoop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const gameData = gameDataRef.current

      if (event.code === 'ArrowLeft') {
        gameData.paddle.moveLeft = true
      }

      if (event.code === 'ArrowRight') {
        gameData.paddle.moveRight = true
      }

      if (event.code === 'Space' && gameData.gameState !== 'playing') {
        resetGame()
      }
    }

    const handleKeyUp = (event: KeyboardEvent): void => {
      const gameData = gameDataRef.current

      if (event.code === 'ArrowLeft') {
        gameData.paddle.moveLeft = false
      }

      if (event.code === 'ArrowRight') {
        gameData.paddle.moveRight = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    startLoop()

    return () => {
      console.log('Cleaning up game loop')
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      
      isRunningRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      aria-label="Block breaker game"
      role="img"
    />
  )
}

export default Game
