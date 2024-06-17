import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./Routes"
import { EmployeesProvider } from "./context/EmployeeContext"

function App() {
  return (
    <BrowserRouter>
      <EmployeesProvider>
        <AppRoutes />
      </EmployeesProvider>
    </BrowserRouter>
  )
}

export default App
