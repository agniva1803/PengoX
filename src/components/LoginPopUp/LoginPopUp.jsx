import React, { useState, useEffect, useContext, useRef } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRef = useRef(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    console.log("Form submitted with data:", data);
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
    const fullUrl = `${url}${endpoint}`;

    try {
      console.log("Sending request to:", fullUrl, "with data:", data);
      const response = await axios.post(fullUrl, data);
      console.log("Response:", response.data);

      if (response.data.success) {
        if (currState === "Login") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setSuccess("Logging in...");
          setTimeout(() => {
            setSuccess("");
            setShowLogin(false); // Auto-close popup
          }, 500);
        } else { // Sign Up
          setCurrState("Login");
          setData((prevData) => ({
            ...prevData,
            name: "",
          }));
          setSuccess("Account created! Switching to login...");
          setTimeout(() => setSuccess(""), 2000);
        }
      } else {
        setError(response.data.message || "An error occurred");
      }
    } catch (err) {
      setError("Network error or server issue. Please try again.");
      console.error("Submission Error:", err.message, err.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (currState === "Login" && passwordRef.current) {
      passwordRef.current.focus();
    }
  }, [currState]);

  useEffect(() => {
    console.log("Form data:", data);
  }, [data]);

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container" autoComplete="on">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={(e) => {
              e.stopPropagation();
              !isSubmitting && setShowLogin(false);
            }}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              id="name"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
              disabled={isSubmitting}
              autoComplete="name"
            />
          )}
          <input
            id="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
            disabled={isSubmitting}
            autoComplete="email"
          />
          <input
            id="password"
            name="password"
            ref={passwordRef}
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
            disabled={isSubmitting}
            autoComplete="current-password"
          />
          <button type="submit" disabled={isSubmitting}>
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          {error && <p className="login-popup-message error">{error}</p>}
          {success && <p className="login-popup-message success">{success}</p>}
          <div className="login-popup-condition">
            <input type="checkbox" required disabled={isSubmitting} />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <p className="login-popup-toggle">
            {currState === "Login" ? (
              <>
                Create a new account?{" "}
                <span onClick={() => !isSubmitting && setCurrState("Sign Up")}>Click here</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={() => !isSubmitting && setCurrState("Login")}>Login here</span>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
