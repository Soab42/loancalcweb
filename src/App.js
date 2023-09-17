import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Daily from "./page/daily/Daily";
// import Newcalc from "./page/new/Newcalc";

import Oldcalc from "./page/old/Oldcalc";
import AdminPanel from "./page/admin/AdminPanel";
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
import AdminRoute from "./auth/AdminRoute";
import Edit from "./page/Edit";
import Profile from "./page/Profile";
import Excel from "./page/Excel";

import CashCounterPage from "./page/CashcounterPage";
// import Carousel from "./page/Carosel";
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
            <Route
              path="cashCounter"
              element={
                <PublicRoute>
                  <CashCounterPage />
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
              path="admin"
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
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
                  <Profile />
                </PublicRoute>
              }
            />
            <Route
              path="edit/:id"
              element={
                <PublicRoute>
                  <Edit />
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
            <Route
              path="excel"
              element={
                <PublicRoute>
                  <Excel />
                </PublicRoute>
              }
            />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
