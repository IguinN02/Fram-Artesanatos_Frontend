const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/usuario";

export const cadastrarUsuario = async (dados) => {
  const resposta = await fetch(`${API_URL}/cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return resposta.json();
};

export const logarUsuario = async (dados) => {
  const resposta = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return resposta.json();
};

export const buscarPerfil = async (token) => {
  const resposta = await fetch(`${API_URL}/perfil`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return resposta.json();
};