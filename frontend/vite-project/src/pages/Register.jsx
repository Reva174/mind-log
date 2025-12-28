import { useState, useContext } from "react";
import { registerUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    login(res.data.token);
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} />
      <button>Register</button>
    </form>
  );
};

export default Register;
