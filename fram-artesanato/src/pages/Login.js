import React, { useState } from "react";
import { logarUsuario } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resposta = await logarUsuario(form);
    if (resposta.error) {
      setMensagem(resposta.error);
    } else {
      localStorage.setItem("token", resposta.token);
      window.dispatchEvent(new Event("login"));
      setMensagem("Login realizado com sucesso! Redirecionando...");
      setTimeout(() => navigate("/Perfil"), 2000);
    }
  };

  return (
    <div className="margin_fixed">
      <h2>Login</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Senha" onChange={handleChange} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;