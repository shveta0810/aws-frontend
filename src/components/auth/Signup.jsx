import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/github-mark-white.svg";
import "./auth.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/signup", { email, password, username });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);

      navigate("/");
    } catch {
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <img src={logo} className="logo-login" />

      <div className="login-box-wrapper">
        <h2>Sign Up</h2>

        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

        <button onClick={handleSignup}>{loading ? "Loading..." : "Signup"}</button>

        <p>Already have account? <Link to="/auth">Login</Link></p>
      </div>
    </div>
  );
}
