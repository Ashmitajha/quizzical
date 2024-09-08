import { createBrowserRouter } from 'react-router-dom'

import Home from './components/Home'
import Quiz from './components/Quiz'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/quiz',
    element: <Quiz />,
  },
])
