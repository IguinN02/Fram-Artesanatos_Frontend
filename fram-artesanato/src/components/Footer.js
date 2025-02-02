import React from "react";
import { Link } from 'react-router-dom';

const Rodape = () => {
  const redesSociais = [
    { href: "https://br.pinterest.com", imgSrc: "/images/pages/index/pinterest-icon.svg", alt: "Pinterest" },
    { href: "https://www.facebook.com", imgSrc: "/images/pages/index/facebook-icon.svg", alt: "Facebook" },
    { href: "https://wa.me/5511942957858", imgSrc: "/images/pages/index/whatsapp-icon.svg", alt: "Whatsapp" },
    { href: "https://www.instagram.com", imgSrc: "/images/pages/index/instagram-icon.svg", alt: "Instagram" },
    { href: "https://twitter.com", imgSrc: "/images/pages/index/twitter-icon.svg", alt: "Twitter" },
  ];

  const contatos = [
    { tipo: "Telefone", href: "https://wa.me/5511942957858", numero: "+55 (11) 94295-7858", imgSrc: "/images/pages/index/icon_footer (1).png" },
    { tipo: "E-Mail", href: "mailto:framartesanatos00@gmail.com?subject=Duvida&body=Gostaria de saber mais sobre seus serviços.", numero: "framartesanatos00@gmail.com", imgSrc: "/images/pages/index/icon_footer (2).png" },
    {
      tipo: "Local", href: "https://www.google.com/maps/place/R.+Narcise+Carbonel,+717+-+Jardim+Monte+Belo,+S%C3%A3o+Paulo+-+SP,+05266-020/@-23.4461481,-46.8034576,17z/data=!3m1!4b1!4m6!3m5!1s0x94cefd0e8307fda9:0x285536089eddee23!8m2!3d-23.446153!4d-46.8008827!16s%2Fg%2F11c1bmr1qz?entry=tts&g_ep=EgoyMDI0MDkxMC4wKgBIAVAD", numero: "Brasil, São Paulo, São Paulo, Parque Esperança, R. Narcise Carbonel, N°717", imgSrc: "/images/pages/index/icon_footer (3).png"
    }
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
          <p className="creditos2">Termos e Condições</p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;