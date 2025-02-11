const API_URL = process.env.REACT_APP_API_URL;

export const cadastrarUsuario = async (dados) => {
  const resposta = await fetch(`${API_URL}/Cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(dados),
  });
  return resposta.json();
};

export const logarUsuario = async (dados) => {
  const resposta = await fetch(`${API_URL}/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return resposta.json();
};

export const buscarPerfil = async (token) => {
  const resposta = await fetch(`${API_URL}/Perfil`, {
    method: "GET",
    mode: 'cors',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return resposta.json();
};