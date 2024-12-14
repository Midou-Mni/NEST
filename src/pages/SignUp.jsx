import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style/sign.css";
import axios from "axios";
import pass from "../assets/password.png";
import emaill from "../assets/email.png";
import nest from "../assets/nest_marketing.svg";

function SignUp() {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
        address,
        postalCode,
        city,
      });
      console.log("Signed up:", response.data);
      navigate("/login");
    } catch (err) {
      setErrorMessage(
        "Signup failed: " + (err.response ? err.response.data : "Unknown error")
      );
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="sign">
      <div className="left">
        <img src={nest} alt="Nest Marketing" />
      </div>
      <div className="right">
        <h2 className="welcome-title">Welcome to Nest Market</h2>
        <p className="welcome-subtitle">You chose the future</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i>
              <img src={emaill} alt="Email Icon" />
            </i>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={emaill} alt="Address Icon" />
            </i>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={emaill} alt="Postal Code Icon" />
            </i>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={emaill} alt="City Icon" />
            </i>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={pass} alt="Password Icon" />
            </i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <i>
              <img src={pass} alt="Confirm Password Icon" />
            </i>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <input type="submit" value="Sign Up" className="submit-btn" />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          
          <div className="auth-links">
            <p className="login-text">
              Already have an account? <Link to="/login" className="login-link">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;