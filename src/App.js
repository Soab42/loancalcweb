import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Daily from "./page/daily/Daily";
import Calculator from "./page/Calculator";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Daily />} />
        <Route path="calculator" element={<Calculator />} />
      </Routes>
    </Router>
  );
}

export default App;
