import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    await registerUser(form);

    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <form
      onSubmit={submit}
      className="p-6 max-w-md mx-auto flex flex-col gap-3"
    >
      <h1 className="text-2xl font-bold">Register</h1>

      <input
        placeholder="Name"
        className="border p-2 rounded"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        className="border p-2 rounded"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button className="bg-blue-500 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}