const API_URL = "https://fram-artesanatos-backend.vercel.app/usuario";

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