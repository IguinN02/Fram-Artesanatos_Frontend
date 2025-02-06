import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCadastro = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/usuario/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Cadastro realizado com sucesso! Redirecionando...");
        setTimeout(() => navigate("/login"), 2000); // Redireciona após 2 segundos
      } else {
        setError(data.error || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="cadastro-container margin_fixed">
      <h2>Cadastro</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleCadastro}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;