import React, { useState } from "react";
import { ApiUrl } from "../../data/apiPath";

const Register = ({ showLoginHandler }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const HandleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ApiUrl}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setUsername("");
        setEmail("");
        setPassword("");
        alert("vendor register successfull");
        showLoginHandler();
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.log(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={HandleRegisterSubmit}>
        <h3>Vendor Register</h3>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Name"
        ></input>
        <br />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email"
        ></input>
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
        ></input>
        <br />
        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
