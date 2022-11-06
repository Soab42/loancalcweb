import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Daily from "./page/DailyCalc/Daily";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Daily />} />
      </Routes>
    </Router>
  );
}

export default App;
