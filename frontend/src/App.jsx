import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import UserManagement from "./pages/UserManagement/UserManagement";
import AddUser from "./pages/UserManagement/AddUser/AddUser";
import EditUser from "./pages/UserManagement/EditUser/EditUser";

import Onboarding from "./pages/Onboarding/Onboarding";

import CostExplorer from "./pages/CostExplorer/CostExplorer";

import AwsServices from "./pages/AwsServices";

import AccessDenied from "./pages/Errors/AccessDenied";
import NotFound from "./pages/Errors/NotFound";

import { SidebarProvider } from "./context/SidebarContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";



function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AuthProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="user-management" element={<UserManagement />} />

                <Route path="user-management/add-user" element={<AddUser />} />
                <Route
                  path="user-management/edit-user/:id"
                  element={<EditUser />} 
                />

                <Route path="onboarding" element={<Onboarding />} />

                <Route path="cost-explorer" element={<CostExplorer />} />
                <Route path="aws-services" element={<AwsServices />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
      </AuthProvider>
    </>
  );
}

export default App;
