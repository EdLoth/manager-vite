import { Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Overview } from './pages/Overview'
import { DefaultLayout } from './pages/DefaultLayout'


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
      </Route>
    </Routes>
  )
}