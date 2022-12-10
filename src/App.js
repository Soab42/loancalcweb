import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Daily from "./page/daily/Daily";
// import Newcalc from "./page/new/Newcalc";

import Oldcalc from "./page/old/Oldcalc";
// import Dailyold from "./page/daily/Dailyold";
import Layout from "./components/Layout";
import Print from "./page/Print";
// import Database from "./components/Database";
import List from "./page/List";
import { AuthProvider } from "./auth/AuthContext";
// import Test from "./page/Test";
import Login from "./page/Login";
import Reg from "./page/Reg";
import PrivateRoute from "./auth/PrivateRoute";
import Logout from "./page/Logout";
import PublicRoute from "./auth/PublicRoute";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="" element={<Daily />} />

            <Route
              path="old"
              element={
                <PublicRoute>
                  <Oldcalc />
                </PublicRoute>
              }
            />
            <Route path="print/:id" element={<Print />} />
            {/* <Route path="test" element={<Test />} /> */}
            <Route
              path="list"
              element={
                <PublicRoute>
                  <List />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route
              path="logout"
              element={
                <PublicRoute>
                  <Logout />
                </PublicRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PublicRoute>
                  <List />
                </PublicRoute>
              }
            />
            <Route
              path="reg"
              element={
                <PrivateRoute>
                  <Reg />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
