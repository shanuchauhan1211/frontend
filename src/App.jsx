
import Verification from './components/Verification';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
 <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/verification" element={<Verification/>}/>

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
