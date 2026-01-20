export interface Paddle {
  x: number
  y: number
  width: number
  height: number
  speed: number
  moveLeft: boolean
  moveRight: boolean
}

export interface Ball {
  x: number
  y: number
  radius: number
  dx: number
  dy: number
  speed: number
}

export interface Block {
  x: number
  y: number
  width: number
  height: number
  destroyed: boolean
}

export type GameState = 'playing' | 'gameover' | 'clear'

export interface GameData {
  paddle: Paddle
  ball: Ball
  blocks: Block[]
  gameState: GameState
}
