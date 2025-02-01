import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setSearchText(text.charAt(0).toUpperCase() + text.slice(1));

    if (text.trim() === "") {
      setProdutos([]);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://fram-artesanatos-backend.onrender.com/produto`
      );
      const produtosFiltrados = response.data.filter(produto =>
        produto.nome.toLowerCase().startsWith(text.toLowerCase())
      );

      const quantidadeMaxima = window.innerWidth >= 1640 ? 8 : window.innerWidth >= 1024 ? 6 : produtosFiltrados.length;
      setProdutos(produtosFiltrados.slice(0, quantidadeMaxima));

      if (produtosFiltrados.length === 0) {
        setProdutos([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      setLoading(false);
    }
  };

  return (
    <header className="cabecalho">
      <nav className={`cabecalho__nav ${isMenuOpen ? "active" : ""}`}>
        <button className="cabecalho__nav__menu_hamburguer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
                    <img className="img_lupa" src="images/global/icon_lupa.svg" alt="Lupa" />
                    <input
                      className="input__procurar search-box"
                      type="text"
                      placeholder="Pesquisar"
                      maxLength="50"
                      value={searchText}
                      onChange={handleInputChange}
                    />
                  </form>
                  <hr className="barra__pesquisa" />
                </div>

                {loading && <p className="nav-lista__item info_pesquisa">Carregando...</p>}

                {produtos.length > 0 && !loading && (
                  <section className="todos_produtos">
                    {produtos.map((produto) => (
                      <div key={produto.idproduto} className="item_pesquisado">
                        <Link className="link" to={`/produto/${produto.idproduto}/${encodeURIComponent(produto.nome)}`} onClick={() => setIsMenuOpen(false)}>
                          <img className="img_pesquisado" src={produto.imagens} alt={produto.nome} />
                          <div className="item-details details_pesquisado">
                            <h3 className="nome_pesquisado">{produto.nome}</h3>
                            <p className="preco_pesquisado">R${Number(produto.preco).toFixed(2)}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </section>
                )}

                {searchText.trim() !== "" && produtos.length === 0 && !loading && (
                  <p className="nav-lista__item info_pesquisa">Nenhum produto encontrado</p>
                )}
              </section>

              {searchText.trim() === "" && (
                <>
                  <li className="nav-lista__item">
                    <Link to="/todosProdutos" onClick={() => setIsMenuOpen(false)}>
                      <p className="font">Todos os Produtos</p>
                    </Link>
                  </li>

                  <li className="nav-lista__item margin__baixo">
                    <Link to="/sobre-nos" onClick={() => setIsMenuOpen(false)}>
                      <p className="font">Sobre Nós</p>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </li>
        </ul>

        <h1 className="cabecalho__nav__titulo">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <b className="titulo_destaque">Fram</b> Artesanatos
          </Link>
        </h1>

        <section className="botao__carrinho">
          <Link to="/carrinho" className="botoes__carrinho" onClick={() => setIsMenuOpen(false)}>
            <img className="cabecalho__nav__carrinho_img" src="/images/global/icon_carrinho.svg" alt="Carrinho de compras" />
          </Link>
        </section>
      </nav>
    </header>
  );
};

export default Header;