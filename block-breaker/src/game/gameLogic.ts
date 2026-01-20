import {
  BALL_RADIUS,
  BALL_SPEED,
  BLOCK_COLS,
  BLOCK_HEIGHT,
  BLOCK_OFFSET_LEFT,
  BLOCK_OFFSET_TOP,
  BLOCK_PADDING,
  BLOCK_ROWS,
  BLOCK_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_SPEED,
  PADDLE_WIDTH,
} from './constants'
import type { Ball, Block, Paddle } from './types'

const isBallOverlappingRect = (ball: Ball, rect: Block | Paddle): boolean => {
  return (
    ball.x + ball.radius >= rect.x &&
    ball.x - ball.radius <= rect.x + rect.width &&
    ball.y + ball.radius >= rect.y &&
    ball.y - ball.radius <= rect.y + rect.height
  )
}

export const updatePaddle = (paddle: Paddle, canvasWidth: number): void => {
  if (paddle.moveLeft) {
    paddle.x -= paddle.speed
  }

  if (paddle.moveRight) {
    paddle.x += paddle.speed
  }

  paddle.x = Math.max(0, Math.min(canvasWidth - paddle.width, paddle.x))
}

export const updateBall = (ball: Ball): void => {
  ball.x += ball.dx
  ball.y += ball.dy
}

export const checkWallCollision = (ball: Ball, canvasWidth: number): void => {
  if (ball.x - ball.radius <= 0 && ball.dx < 0) {
    ball.dx = Math.abs(ball.dx)
    ball.x = ball.radius
  }

  if (ball.x + ball.radius >= canvasWidth && ball.dx > 0) {
    ball.dx = -Math.abs(ball.dx)
    ball.x = canvasWidth - ball.radius
  }

  if (ball.y - ball.radius <= 0 && ball.dy < 0) {
    ball.dy = Math.abs(ball.dy)
    ball.y = ball.radius
  }
}

export const checkPaddleCollision = (ball: Ball, paddle: Paddle): boolean => {
  if (ball.dy <= 0) {
    return false
  }

  if (!isBallOverlappingRect(ball, paddle)) {
    return false
  }

  ball.dy = -Math.abs(ball.dy)
  ball.y = paddle.y - ball.radius
  return true
}

export const checkBlocksCollision = (ball: Ball, blocks: Block[]): boolean => {
  for (const block of blocks) {
    if (block.destroyed) {
      continue
    }

    if (isBallOverlappingRect(ball, block)) {
      block.destroyed = true
      ball.dy = ball.dy > 0 ? -ball.dy : Math.abs(ball.dy)
      return true
    }
  }

  return false
}

export const isGameOver = (ball: Ball, canvasHeight: number): boolean => {
  return ball.y - ball.radius > canvasHeight
}

export const isGameClear = (blocks: Block[]): boolean => {
  return blocks.every((block) => block.destroyed)
}

export const initBlocks = (): Block[] => {
  const blocks: Block[] = []

  for (let row = 0; row < BLOCK_ROWS; row += 1) {
    for (let col = 0; col < BLOCK_COLS; col += 1) {
      const x = BLOCK_OFFSET_LEFT + col * (BLOCK_WIDTH + BLOCK_PADDING)
      const y = BLOCK_OFFSET_TOP + row * (BLOCK_HEIGHT + BLOCK_PADDING)

      blocks.push({
        x,
        y,
        width: BLOCK_WIDTH,
        height: BLOCK_HEIGHT,
        destroyed: false,
      })
    }
  }

  return blocks
}

export const createInitialPaddle = (): Paddle => {
  return {
    x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2,
    y: CANVAS_HEIGHT - PADDLE_HEIGHT - 16,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: PADDLE_SPEED,
    moveLeft: false,
    moveRight: false,
  }
}

export const createInitialBall = (): Ball => {
  return {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT - PADDLE_HEIGHT - 16 - BALL_RADIUS - 2,
    radius: BALL_RADIUS,
    dx: BALL_SPEED,
    dy: -BALL_SPEED,
    speed: BALL_SPEED,
  }
}
