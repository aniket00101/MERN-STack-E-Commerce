import {BrowserRouter, Route, Routes} from "react-router-dom"
import Userlayout from "./components/layout/userlayout"
import Home from "./pages/Home"
import {Toaster} from "sonner"
function App() {
  
  return (
    <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={ <Userlayout /> }>
          <Route index element={<Home />}/>
        </Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


// rabbir-red : #ea2e0e