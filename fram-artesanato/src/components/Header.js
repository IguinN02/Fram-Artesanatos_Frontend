import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="cabecalho">
      <nav className={`cabecalho__nav ${isMenuOpen ? "active" : ""}`}>
        <button
          className="cabecalho__nav__menu_hamburguer"
          onClick={toggleMenu}
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
              <li className="nav-lista__item">
                <Link to="/todosProdutos" onClick={closeMenu}>
                  <p className="font">Todos os Produtos</p>
                </Link>
              </li>

              <li className="nav-lista__item margin__baixo">
                <Link to="/sobre-nos" onClick={closeMenu}>
                  <p className="font">Sobre Nós</p>
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        <h1 className="cabecalho__nav__titulo">
          <Link to="/" onClick={closeMenu}>
            <b className="titulo_destaque">Fram</b> Artesanatos
          </Link>
        </h1>

        <section className="botao__carrinho">
          <Link to="/carrinho" className="botoes__carrinho" onClick={closeMenu}>
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