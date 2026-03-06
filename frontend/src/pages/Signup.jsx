import { useState } from "react";
import axios from "axios";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {

      const res = await axios.post(
        "https://ftas.onrender.com/api/auth/signup",
        { email, password }
      );

      alert(res.data.message || "Signup successful");

      window.location.href = "/login";

    } catch (err) {

      console.log(err.response?.data || err.message);

      alert(err.response?.data?.error || "Signup failed");

    }

  };

  return (
    <div className="container">

      <h2>Signup</h2>

      <form onSubmit={handleSignup}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>

      </form>

    </div>
  );
}