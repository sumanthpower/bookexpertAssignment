import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const hasToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userToken="));

  useEffect(() => {
    if (hasToken) {
      navigate("/");
    }
  }, [hasToken]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@test.com" && password === "1234") {
      const d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = `userToken=mock_token_123; ${expires}; path=/`;
      document.cookie = `userEmail=${email}; ${expires}; path=/`;
      navigate("/");
    } else {
      alert("Invalid Credentials! Use admin@test.com and 1234");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-green-100">
      <form onSubmit={handleLogin}>
        <fieldset className="fieldset bg-gray-500 rounded-md border-base-300 w-96 p-8 flex flex-col shadow-2xl text-white">
          <legend className="fieldset-legend text-black text-3xl font-bold mb-4">
            Login
          </legend>

          <label className="label">Email</label>
          <input
            type="email"
            className="input outline-none text-black p-2 rounded"
            placeholder="admin@test.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label mt-2">Password</label>
          <input
            type="password"
            className="input outline-none text-black p-2 rounded"
            placeholder="1234"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-neutral mt-6 bg-black text-white p-2 rounded hover:bg-gray-800 transition-all"
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default LoginPage;
