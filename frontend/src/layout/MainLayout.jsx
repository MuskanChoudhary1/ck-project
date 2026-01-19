import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";
import "./MainLayout.css";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="layout">
      <Header />

      <div className="layout-body">
        <Sidebar />

        <main className="layout-content">
          <Outlet />
        </main>
        
      </div>

      <Footer />
    </div>
  );
}

export default MainLayout;
