import React, { useState } from "react";
import { ApiUrl } from "../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const response = await fetch(`${ApiUrl}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        const vendorId = data.venEmail._id;
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
        alert("Login successfull");

        showWelcomeHandler();
        const vendorIdResponse = await fetch(
          `${ApiUrl}/vendor/single-vendor/${vendorId}`
        );
        console.log("vendorIdResponse", vendorIdResponse);
        const vendorSingleIdData = await vendorIdResponse.json();
        if (vendorIdResponse.ok) {
          console.log(
            "vendorbyid",
            vendorSingleIdData.vendorbyid.firm[0].firmName
          );
          const firmName = vendorSingleIdData.vendorbyid.firm[0].firmName;
          localStorage.setItem("firmName", firmName);
          localStorage.setItem("vendorFormId", vendorSingleIdData.vendorFormId);
          window.location.reload();
        }
      } else {
        setError("signin failed");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={handleLoginSubmit}>
        <h3>Vendor Login</h3>
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

export default Login;
