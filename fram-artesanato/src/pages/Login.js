import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const response = await login(email, password);

    if (response.success) {
      navigate("/");
    } else {
      setError(response.error);
    }
  };

  return (
    <div className="login-container margin_fixed">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link></p>
    </div>
  );
};

export default Login;