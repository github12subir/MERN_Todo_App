import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register(form));
    navigate("/"); // go to login
  };

  return (
    <div>
      <h2>Register</h2>

      {/* 🔙 Back Button */}
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}