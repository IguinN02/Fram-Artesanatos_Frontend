import React, { useState, useEffect } from 'react';
import { cadastrarUsuario, logarUsuario } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";

function Cadastro() {
  useEffect(() => {
    document.title = 'Fran Artesanatos - Cadastre-se';
  }, []);

  const [form, setForm] = useState({ nome: "", email: "", telefone: "", password: "" });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [popupTipo, setPopupTipo] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.telefone || !form.password) {
      setPopupTipo("preenchaCampos");
      return;
    }

    try {
      const respostaCadastro = await cadastrarUsuario(form);

      if (respostaCadastro.error) {
        setPopupTipo("emailEmUso");
      } else {
        setPopupTipo("contaCriada");

        const respostaLogin = await logarUsuario({
          email: form.email,
          password: form.password,
        });

        if (!respostaLogin.error) {
          localStorage.setItem("token", respostaLogin.token);
          window.dispatchEvent(new Event("login"));
          setTimeout(() => navigate("/Perfil"), 2000);
        }
      }
    } catch (error) {
      setPopupTipo("Ops");
    }
  };

  return (
    <main className="principal margin_fixed">
      <section className="background__branco">
        <section>
          <div>
            <h2>Crie uma Conta</h2>
            <Link to="/">
              <img alt="X" src="/images/pages/cadastro/ComponentX.svg" />
            </Link>
          </div>
          <p>Por favor preencha os campos abaixo:</p>
        </section>

        <form onSubmit={handleSubmit}>
          <input type="text" name="nome" minLength="3" maxLength="100" placeholder="Digite seu Nome Completo:" onChange={handleChange} required />
          <input type="email" name="email" minLength="10" maxLength="100" placeholder="E-Mail:" onChange={handleChange} required />
          <input type="text" name="telefone" minLength="15" maxLength="15" placeholder="Telefone:" onChange={handleChange} required />

          <div>
            <input
              type={mostrarSenha ? "text" : "password"}
              name="password"
              minLength="8"
              maxLength="16"
              placeholder="Senha:"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                </svg>
              )}
            </button>
          </div>

          <button type="submit">Criar Conta</button>
        </form>

        <section>
          <p>
            <img alt="Icon Flor" src="/images/pages/cadastro/flor1.svg" />
            OU
            <img alt="Icon Flor" src="/images/pages/cadastro/flor2.svg" />
          </p>

          <p>Você já tem uma conta?</p>
          <Link to="/Login">Fazer Login</Link>
        </section>
      </section>

      {popupTipo && <Popup tipo={popupTipo} fechar={() => setPopupTipo(null)} />}
    </main>
  );
}

export default Cadastro;