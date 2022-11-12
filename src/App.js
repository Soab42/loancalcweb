import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Daily from "./page/daily/Daily";
import Newcalc from "./page/new/Newcalc";

import Oldcalc from "./page/old/Oldcalc";
import Dailyold from "./page/daily/Dailyold";
import Layout from "./components/Layout";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="" element={<Daily />} />
          <Route path="dailyold" element={<Dailyold />} />
          <Route path="new" element={<Newcalc />} />
          <Route path="old" element={<Oldcalc />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
