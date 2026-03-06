import { useState } from "react";
import axios from "axios";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://ftas.onrender.com/api/auth/signup",
        { email, password }
      );

      alert("Signup successful");

      window.location.href = "/login";

    } catch (err) {

      alert("Signup failed");

    }

  };

  return (
    <div className="container">

      <h2>Signup</h2>

      <form onSubmit={handleSignup}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">Signup</button>

      </form>

    </div>
  );
}
