import {BrowserRouter, Route, Routes} from "react-router-dom"
import Userlayout from "./components/layout/userlayout"
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Userlayout /> }></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


// rabbir-red : #ea2e0e