import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../assets/CloudKeeper_Logo.jpg";
import { login } from "../api/authApi";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");


//   // const adminMail = "admin@cloudkeeper.com";
//   // const adminPass = "admin123";

//   const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await login({ email, password });

//     localStorage.setItem("token", res.data.token);
//     localStorage.setItem("role", res.data.role);
//     localStorage.setItem("name", res.data.name);

//     toast.success("Login successful");
//     navigate("/dashboard");
//   } catch (err) {
//     // nothing needed — interceptor already showed toast
//   }
// };




//   //   if (email === adminMail && password === adminPass) {
//   //     localStorage.setItem("loggedIn", "true");
//   //     navigate("/dashboard");
//   //   } else {
//   //     alert("Invalid email or password!");
//   //   }
//   // };
  

//   return (
//     <div className="login-wrapper">
//       <div className="login-box">
        
//         <div className="logo-container">
//           <img src={logo} alt="CloudKeeper Logo" className="logo-img" />
//         </div>

//         <form onSubmit={handleLogin}>
          
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button type="submit" className="login-btn">LOGIN</button>
//         </form>
//       </div>
//     </div>
//   );
// }


function Login() {
  const navigate = useNavigate();
  const { login: authLogin, isLoggedIn } = useAuth(); // get login function from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      authLogin(res.data.token, res.data.role, res.data.name); //Context will handle token & role
      // Optional: store name if you want
      localStorage.setItem("name", res.data.name);

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      // Axios interceptor already shows toast
      console.error(err);
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
