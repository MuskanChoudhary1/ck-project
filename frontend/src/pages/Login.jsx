import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/CloudKeeper_Logo.jpg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const adminMail = "admin@cloudkeeper.com";
  const adminPass = "admin123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === adminMail && password === adminPass) {
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        
        <div className="logo-container">
          <img src={logo} alt="CloudKeeper Logo" className="logo-img" />
        </div>

        <form onSubmit={handleLogin}>
          
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="login-btn">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
