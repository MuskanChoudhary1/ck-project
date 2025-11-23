import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import UserManagement from "./pages/UserManagement/UserManagement";
import AddUser from "./pages/UserManagement/AddUser/AddUser";
import Onboarding from "./pages/Onboarding";
import CostExplorer from "./pages/CostExplorer";
import AwsServices from "./pages/AwsServices";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<MainLayout />}>

          <Route index element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />

          <Route path="user-management/add-user" element={<AddUser />} />

          <Route path="onboarding" element={<Onboarding />} />
          <Route path="cost-explorer" element={<CostExplorer />} />
          <Route path="aws-services" element={<AwsServices />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
