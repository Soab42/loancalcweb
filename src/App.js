import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Daily from "./page/daily/Daily";
import Newcalc from "./page/new/Newcalc";
import Calculator from "./page/Calculator";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="daily" element={<Daily />} />
        <Route path="calculator" element={<Calculator />} />
        <Route path="" element={<Newcalc />} />
      </Routes>
    </Router>
  );
}

export default App;
