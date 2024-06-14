import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/human-resource/Employee";
import Register from "./pages/Register";
import Role from "./pages/human-resource/Role";
import Location from "./pages/human-resource/Location";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/human-resource/employee-management"
              element={<Employee />}
            />
            <Route path="/human-resource/role-management" element={<Role />} />
            <Route
              path="/human-resource/location-management"
              element={<Location />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
