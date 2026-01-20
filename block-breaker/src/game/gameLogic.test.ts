import { describe, expect, it } from 'vitest'
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
import {
  checkBlocksCollision,
  checkPaddleCollision,
  checkWallCollision,
  initBlocks,
  isGameClear,
  isGameOver,
  updateBall,
  updatePaddle,
} from './gameLogic'
import type { Ball, Block, Paddle } from './types'

const createPaddle = (overrides: Partial<Paddle> = {}): Paddle => {
  return {
    x: 100,
    y: 200,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    speed: PADDLE_SPEED,
    moveLeft: false,
    moveRight: false,
    ...overrides,
  }
}

const createBall = (overrides: Partial<Ball> = {}): Ball => {
  return {
    x: 120,
    y: 180,
    radius: BALL_RADIUS,
    dx: BALL_SPEED,
    dy: BALL_SPEED,
    speed: BALL_SPEED,
    ...overrides,
  }
}

describe('gameLogic', () => {
  it('updates paddle position and clamps within bounds', () => {
    const paddle = createPaddle({ x: 10, moveLeft: true })

    updatePaddle(paddle, CANVAS_WIDTH)
    expect(paddle.x).toBe(10 - PADDLE_SPEED)

    paddle.moveLeft = true
    paddle.x = 0
    updatePaddle(paddle, CANVAS_WIDTH)
    expect(paddle.x).toBe(0)

    paddle.moveLeft = false
    paddle.moveRight = true
    paddle.x = CANVAS_WIDTH - PADDLE_WIDTH
    updatePaddle(paddle, CANVAS_WIDTH)
    expect(paddle.x).toBe(CANVAS_WIDTH - PADDLE_WIDTH)
  })

  it('updates ball position', () => {
    const ball = createBall({ x: 10, y: 20, dx: 2, dy: -3 })

    updateBall(ball)

    expect(ball.x).toBe(12)
    expect(ball.y).toBe(17)
  })

  it('reflects ball off walls', () => {
    const leftBall = createBall({ x: BALL_RADIUS - 1, dx: -2 })
    checkWallCollision(leftBall, CANVAS_WIDTH)
    expect(leftBall.dx).toBe(2)

    const rightBall = createBall({ x: CANVAS_WIDTH - BALL_RADIUS + 1, dx: 3 })
    checkWallCollision(rightBall, CANVAS_WIDTH)
    expect(rightBall.dx).toBe(-3)

    const topBall = createBall({ y: BALL_RADIUS - 1, dy: -4 })
    checkWallCollision(topBall, CANVAS_WIDTH)
    expect(topBall.dy).toBe(4)
  })

  it('reflects ball off paddle', () => {
    const paddle = createPaddle({ x: 80, y: 200 })
    const ball = createBall({ x: 90, y: 195, dy: 4 })

    const collided = checkPaddleCollision(ball, paddle)

    expect(collided).toBe(true)
    expect(ball.dy).toBe(-4)
    expect(ball.y).toBe(paddle.y - ball.radius)
  })

  it('handles block collision', () => {
    const ball = createBall({ x: 60, y: 60, dy: 3 })
    const blocks: Block[] = [
      { x: 50, y: 50, width: 40, height: 20, destroyed: false },
    ]

    const hit = checkBlocksCollision(ball, blocks)

    expect(hit).toBe(true)
    expect(blocks[0].destroyed).toBe(true)
    expect(ball.dy).toBeLessThan(0)
  })

  it('detects game over when ball falls below canvas', () => {
    const ball = createBall({ y: CANVAS_HEIGHT + BALL_RADIUS + 1 })

    expect(isGameOver(ball, CANVAS_HEIGHT)).toBe(true)
  })

  it('detects game clear when all blocks are destroyed', () => {
    const blocks: Block[] = [
      { x: 0, y: 0, width: 10, height: 10, destroyed: true },
      { x: 20, y: 0, width: 10, height: 10, destroyed: true },
    ]

    expect(isGameClear(blocks)).toBe(true)
  })

  it('initializes the correct number of blocks with expected positions', () => {
    const blocks = initBlocks()

    expect(blocks).toHaveLength(BLOCK_ROWS * BLOCK_COLS)
    expect(blocks[0].x).toBe(BLOCK_OFFSET_LEFT)
    expect(blocks[0].y).toBe(BLOCK_OFFSET_TOP)

    const lastBlock = blocks[blocks.length - 1]
    expect(lastBlock.width).toBe(BLOCK_WIDTH)
    expect(lastBlock.height).toBe(BLOCK_HEIGHT)
    expect(lastBlock.x).toBe(
      BLOCK_OFFSET_LEFT + (BLOCK_COLS - 1) * (BLOCK_WIDTH + BLOCK_PADDING),
    )
    expect(lastBlock.y).toBe(
      BLOCK_OFFSET_TOP + (BLOCK_ROWS - 1) * (BLOCK_HEIGHT + BLOCK_PADDING),
    )
  })
})
