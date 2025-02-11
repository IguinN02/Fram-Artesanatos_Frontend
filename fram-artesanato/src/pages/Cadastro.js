
import React, { useState } from "react";
import { cadastrarUsuario, logarUsuario } from "../services/authService";
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
    const respostaCadastro = await cadastrarUsuario(form);

    if (respostaCadastro.error) {
      setMensagem(respostaCadastro.error);
    } else {
      setMensagem("Cadastro realizado com sucesso! Efetuando login...");

      const respostaLogin = await logarUsuario({
        email: form.email,
        password: form.password,
      });

      if (respostaLogin.error) {
        setMensagem("Cadastro realizado, mas houve um erro ao fazer login.");
      } else {
        localStorage.setItem("token", respostaLogin.token);
        window.dispatchEvent(new Event("login"));
        setMensagem("Cadastro e login realizados com sucesso! Redirecionando...");
        setTimeout(() => navigate("/Perfil"), 2000);
      }
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