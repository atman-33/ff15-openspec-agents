import { createBrowserRouter } from 'react-router-dom'
import GamePage from './pages/GamePage'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <GamePage />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
)
