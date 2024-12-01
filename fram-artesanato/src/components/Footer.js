import React from "react";
import { Link } from 'react-router-dom';

const Rodape = () => {
  const redesSociais = [
    { href: "https://www.instagram.com/framplima?igsh=MWRmZ24wZml6bXhmaQ==", imgSrc: "/images/pages/index/instagram-icon.svg", alt: "Instagram" },
  ];

  const contatos = [
    { tipo: "Telefone", href: "https://wa.me/5511971195011", numero: "+55 (11) 97119-5011", imgSrc: "/images/pages/index/icon_footer (1).png" },
    { tipo: "E-Mail", href: "mailto:framartesanatos00@gmail.com?subject=Duvida&body=Gostaria de saber mais sobre seus serviços.", numero: "framartesanatos00@gmail.com", imgSrc: "/images/pages/index/icon_footer (2).png" }
  ];

  const ajudaLinks = [
    { nome: "Contate-nós", to: "/sobre-nos" },
    { nomeSobre: "Sobre nós", to: "/sobre-nos" }
  ];

  return (
    <footer className="rodape">
      <div className="rede__sociais">
        {redesSociais.map((rede, index) => (
          <a key={index} href={rede.href} target="_blank" rel="noopener noreferrer">
            <img className="redes__sociais__icons" src={rede.imgSrc} alt={rede.alt} />
          </a>
        ))}
      </div>

      <div className="titulo__sub">
        <h1 className="cabecalho__nav__titulo titulo__rodape">
          <Link to="/"><b className="titulo_destaque">Fram</b> Artesanatos</Link>
        </h1>
        <p className="rodape__descricao">
          Fram Artesanatos - Nascida do hobby de uma pequena empreendedora, nossa loja transforma sonhos em
          realidade, criando itens personalizados com carinho para deixar uma marca especial na vida de cada cliente.
        </p>
      </div>

      <div className="num_email__local">
        {contatos.map((contato, index) => (
          <p key={index} className={contato.tipo.toLowerCase()}>
            <img className={`icon__${contato.tipo.toLowerCase()} rodape__icon`} src={contato.imgSrc} alt={contato.tipo} />
            <a href={contato.href} target="_blank" rel="noopener noreferrer">{contato.numero}</a>
          </p>
        ))}
      </div>

      <div className="rodape__mais__info">
        <h4 className="rodape__titulos">Ajuda</h4>
        {ajudaLinks.map((link, index) => (
          <p key={index} className="rodape__itens__info">
            <Link to={link.to}>{link.nomeSobre}</Link>
          </p>
        ))}

        <h4 className="rodape__titulos">Atendimento ao Cliente</h4>
        {ajudaLinks.map((link, index) => (
          <p key={index} className="rodape__itens__info">
            <Link to={link.to}>{link.nome}</Link>
          </p>
        ))}
      </div>

      <hr className="linha" />

      <div className="rodape__creditos">
        <p className="creditos1">@ 2024 Fram Artesanatos</p>
        <div className="creditos">
          <p className="creditos2">Política de Privacidade</p>
          <p className="creditos3">Termos e Condições</p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;