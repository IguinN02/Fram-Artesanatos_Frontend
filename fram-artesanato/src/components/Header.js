import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setProdutos((prevProdutos) =>
        window.innerWidth < 1024 ? prevProdutos.slice(0, 4) : prevProdutos
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = async (e) => {
    const text = e.target.value;
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    setSearchText(capitalizedText);

    if (text.trim() === "") {
      setProdutos([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `https://fram-artesanatos-backend.onrender.com/produto`
      );

      let produtosFiltrados = response.data.filter((produto) =>
        produto.nome.toLowerCase().startsWith(text.toLowerCase())
      );

      if (produtosFiltrados.length === 0) {
        produtosFiltrados = response.data.filter((produto) =>
          produto.nome.toLowerCase().includes(text.toLowerCase())
        );
      }

      const quantidadeMaxima =
        window.innerWidth > 1024
          ? window.innerWidth >= 1640
            ? 9
            : window.innerWidth >= 1125
              ? 6
              : 4
          : 4;

      setProdutos(produtosFiltrados.slice(0, quantidadeMaxima));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/TodosProdutos?search=${encodeURIComponent(searchText)}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="cabecalho">
      <nav className={`cabecalho__nav ${isMenuOpen ? "active" : ""}`}>
        <button
          className="cabecalho__nav__menu_hamburguer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        </button>

        <ul className={`nav-lista ${isMenuOpen ? "active" : ""}`}>
          <h2 className="nav-lista__titulo">Menu</h2>

          <li className="nav-lista__item">
            <ul className="itens__menu__hamburguer">
              <section className="box_pesquisa">
                <div className="pesquisa_input">
                  <form className="centralizar search-box">
                    <img
                      className="img_lupa"
                      src="/images/global/icon_lupa.svg"
                      alt="Lupa"
                    />
                    <input
                      className="input__procurar search-box"
                      type="text"
                      placeholder="Pesquisar"
                      maxLength="50"
                      value={searchText}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                    />
                  </form>
                  <hr className="linha_pesquisa" />
                </div>

                {loading && (
                  <p className="pesquisa_input info_pesquisa">Carregando...</p>
                )}

                {produtos.length > 0 && !loading && (
                  <div className="todos_produtos">
                    {produtos.map((produto) => (
                      <div key={produto.idproduto} className="item_pesquisado">
                        <Link
                          className="link"
                          to={`/produto/${produto.idproduto}/${encodeURIComponent(
                            produto.nome
                          )}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <img
                            className="img_pesquisado"
                            src={produto.imagens}
                            alt={produto.nome}
                          />
                          <div className="item-details details_pesquisado">
                            <h3 className="nome_pesquisado">{produto.nome}</h3>
                            <p className="preco_pesquisado">
                              R${Number(produto.preco).toFixed(2)}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}

                    <Link
                      className="link_pesquisa"
                      to={`/TodosProdutos?search=${encodeURIComponent(searchText)}`}
                      onClick={(e) => {
                        setIsMenuOpen(false);
                      }}
                    >
                      <p className="pesquisa_vermais">Ver Mais</p>
                    </Link>
                  </div>
                )}

                {searchText.trim() !== "" &&
                  produtos.length === 0 &&
                  !loading && (
                    <p className="pesquisa_input info_pesquisa">
                      Nenhum produto encontrado.
                    </p>
                  )}
              </section>

              {searchText.trim() === "" && (
                <>
                  <li className="nav-lista__item">
                    {isLoggedIn ? (
                      <Link to="/Perfil" onClick={() => setIsMenuOpen(false)}>
                        <div className="box_conta">
                          <svg
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                          </svg>
                          <p className="test_pesq conta_titulo">Perfil</p>
                        </div>
                      </Link>
                    ) : (
                      <Link to="/Cadastro" onClick={() => setIsMenuOpen(false)}>
                        <div className="box_conta">
                          <svg
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                          </svg>
                          <p className="test_pesq conta_titulo">Cadastre-se</p>
                        </div>
                      </Link>
                    )}
                  </li>

                  <li className="nav-lista__item">
                    <Link to="/TodosProdutos" onClick={() => setIsMenuOpen(false)}>
                      <p className="pesquisa_input test_pesq">Todos os Produtos</p>
                    </Link>
                  </li>

                  <li className="nav-lista__item margin__baixo">
                    <Link to="/sobre-nos" onClick={() => setIsMenuOpen(false)}>
                      <p className="pesquisa_input test_pesq">Sobre Nós</p>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>

        <h1 className="cabecalho__nav__titulo">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <b className="titulo_destaque">Fran</b> Artesanatos
          </Link>
        </h1>

        <section className="botao__carrinho">
          <Link
            to="/carrinho"
            className="botoes__carrinho"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              className="cabecalho__nav__carrinho_img"
              src="/images/global/icon_carrinho.svg"
              alt="Carrinho de compras"
            />
          </Link>
        </section>
      </nav>
    </header>
  );
};

export default Header;