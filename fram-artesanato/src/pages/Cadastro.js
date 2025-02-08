import React, { useState } from "react";
import { cadastrarUsuario } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

function Cadastro() {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", password: "" });
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resposta = await cadastrarUsuario(form);

    if (resposta.error) {
      setMensagem(resposta.error);
    } else {
      setMensagem("Cadastro realizado com sucesso!");
      localStorage.setItem("token", resposta.token);
      setTimeout(() => navigate("/perfil"), 2000);
    }
  };

  return (
    <div className="margin_fixed">
      <h2>Cadastro</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Senha" onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/Login">
        <p>LOGIN</p>
      </Link>
    </div>
  );
}

export default Cadastro;