import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { CarrinhoContext } from '../context/CarrinhoContext';
import Popup from '../components/Popup';

import '../css/import.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Home() {
  const [produtos, setProdutos] = useState([]);
  const [mensagemPopup, setMensagemPopup] = useState(null);
  const { adicionarAoCarrinho, produtoJaNoCarrinho } = useContext(CarrinhoContext);
  const [swiperConfig, setSwiperConfig] = useState({
    slidesPerView: window.innerWidth < 351 ? 1 : window.innerWidth < 1024 ? 2 : 3,
    paginationClickable: window.innerWidth < 351 ? false : true,
  });

  const limiteNovidades = 5;
  const limiteMaisVendidos = 5;

  useEffect(() => {
    document.title = 'Fran Artesanatos - Home';
  }, []);

  useEffect(() => {
    axios.get("https://fram-artesanatos-backend.onrender.com/produto")
      .then((resposta) => {
        const produtosEmbaralhados = resposta.data.sort(() => 0.5 - Math.random());
        setProdutos(produtosEmbaralhados);
      })
      .catch((erro) => console.error("Erro ao buscar produtos:", erro));
  }, []);

  useEffect(() => {
    const atualizarSwiperConfig = () => {
      setSwiperConfig({
        slidesPerView: window.innerWidth < 351 ? 1 : window.innerWidth < 1024 ? 2 : 3,
        paginationClickable: window.innerWidth < 351 ? false : true,
      });
    };

    window.addEventListener('resize', atualizarSwiperConfig);
    return () => window.removeEventListener('resize', atualizarSwiperConfig);
  }, []);

  const adicionarNoCarrinho = (produto) => {
    if (produtoJaNoCarrinho(produto.idproduto)) {
      setMensagemPopup('jaAdicionado');
    } else {
      adicionarAoCarrinho(produto);
      setMensagemPopup('adicionado');
    }
    setTimeout(() => setMensagemPopup(null), 6000);
  };

  const produtosNovidades = produtos.slice(0, limiteNovidades);
  const produtosMaisVendidos = produtos.slice(limiteNovidades, limiteNovidades + limiteMaisVendidos);

  const renderCarrossel = (produtos, tipo) => (
    <section className={`principal__novidades ${tipo}`}>
      <h2 className="principal__novidades__titulo">
        <img src="images/global/flor1.svg" alt="flor" />
        <b className="titulo__novidades">{tipo === 'novidades' ? 'Novidades' : 'Mais Vendidos'}</b>
        <img src="images/global/flor2.svg" alt="flor" />
      </h2>
      <p className="principal__novidades__subtitulo">Veja Tudo</p>

      <article className="principal__novidades__carrossel">
        <div className="carrossel__container">
          <div className={`swiper ${tipo}`}>
            <div className={`swiper-button-prev ${tipo}`}></div>
            <div className={`swiper-button-next ${tipo}`}></div>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={25}
              slidesPerView={swiperConfig.slidesPerView}
              centeredSlides={true}
              pagination={{ clickable: swiperConfig.paginationClickable }}
              navigation={{
                prevEl: `.swiper-button-prev.${tipo}`,
                nextEl: `.swiper-button-next.${tipo}`,
              }}
            >
              {produtos.map((produto) => (
                <SwiperSlide key={produto.idproduto}>
                  <Link
                    className="carrossel__imagens"
                    to={`/produto/${produto.idproduto}/${encodeURIComponent(produto.nome)}`}
                  >
                    <img
                      className="img_produto"
                      src={produto.imagens}
                      alt={`Foto do Produto ${produto.nome}`}
                    />
                  </Link>
                  <div className="infos__produto">
                    <Link className="titulo__produto color" to={`/produto/${produto.idproduto}/${encodeURIComponent(produto.nome)}`}>
                      {produto.nome}
                    </Link>
                    <Link className="descricao__produto" to={`/produto/${produto.idproduto}/${encodeURIComponent(produto.nome)}`}>
                      {produto.descricao}
                    </Link>
                    <Link className="valor__produto color" to={`/produto/${produto.idproduto}/${encodeURIComponent(produto.nome)}`}>
                      R${Number(produto.preco).toFixed(2)}
                    </Link>
                    <button className="adicionar__carrinho" onClick={() => adicionarNoCarrinho(produto)}>
                      Adicionar ao Carrinho
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </article>
    </section>
  );

  return (
    <main className="principal">
      <section className="principal__novo_produto">
        <h2 className="principal__novo_produto__titulo">
          Seja bem-vindo(a) à Fran Artesanatos!
        </h2>
        <p className="principal__novo_produto__p">
          A loja perfeita para quem valoriza itens únicos e personalizados, feitos com carinho para refletir seu estilo e atender às suas necessidades. ❤️
        </p>
        <Link to="/TodosProdutos" className="principal__novo_produto__link">
          Ver Produtos
        </Link>
      </section>

      <section className="background__branco carrossel__full">
        {renderCarrossel(produtosNovidades, 'novidades')}
      </section>

      <section className="background__branco carrossel__full">
        {renderCarrossel(produtosMaisVendidos, 'maisVendidos')}
      </section>

      <section className="background__branco">
        <section className="produto__destaque">
          <div className="produto__destaque__flex">
            <img className="produto__destaque__foto" src="https://i.ibb.co/QdSZB6T/Manta-BB-Sophia.jpg"
              alt="Foto do produto em destaque" />
          </div>
          <div className="bloco__descricao_botao">
            <h2 className="produto__destaque__titulo">Kit Conforto e Carinho cor Roxa</h2>
            <p className="produto__destaque__descricao">
              Este kit encantador é perfeito para quem busca conforto e aconchego. Composto por uma mantinha super macia e um roupão
              acolhedor, ambos na delicada tonalidade roxa, ele proporciona momentos de relaxamento e bem-estar. O Kit Conforto e Carinho
              Roxo é ideal para quem deseja um toque de carinho e suavidade no dia a dia, ou para presentear alguém especial com muito afeto.
            </p>
            <Link
              className="produto__destaque__botao"
              to="/produto/2/Kit%20Ursinho%20Roxo"
            >
              Ver Produto
            </Link>
          </div>
        </section>
      </section>

      <section className="background__branco">
        <section className="produto__destaque">
          <div className="produto__destaque__flex">
            <img className="produto__destaque__foto" src="https://i.ibb.co/GkQNHk2/Kit-Urso-Azul.jpg"
              alt="Foto do produto em destaque" />
          </div>
          <div className="bloco__descricao_botao">
            <h2 className="produto__destaque__titulo">Kit Conforto e Carinho cor Azul</h2>
            <p className="produto__destaque__descricao">
              Este kit encantador é perfeito para quem busca conforto e aconchego. Composto por uma mantinha super macia e um roupão
              acolhedor, ambos na delicada tonalidade azul, ele proporciona momentos de relaxamento e bem-estar. O Kit Conforto e Carinho
              Azul é ideal para quem deseja um toque de carinho e suavidade no dia a dia, ou para presentear alguém especial com muito afeto.
            </p>
            <Link
              className="produto__destaque__botao"
              to="/produto/3/Kit%20Ursinho%20Azul"
            >
              Ver Produto
            </Link>
          </div>
        </section>
      </section>

      <section className="background__branco">
        <section className="compartilhar">
          <h2 className="compartilhar__titulo">Compartilhe com a Gente</h2>
          <h2 className="compartilhar__subtitulo">#Fran<b>artesanatos</b></h2>
          <div className="compartilhar__fotos">
            <img className="compartilhar__imagens" src="https://i.ibb.co/vxjJKv0/Roupao-Azul-Escuro.jpg" alt="Instagram Foto" />
            <img className="compartilhar__imagens" src="https://i.ibb.co/NFTszqD/Avental-Moranguinho.jpg" alt="Instagram Foto" />
            <img className="compartilhar__imagens" src="https://i.ibb.co/8mjhr3t/Pano-Prato-Verde-Escuro.jpg" alt="Instagram Foto" />
            <img className="compartilhar__imagens" src="https://i.ibb.co/7jy8R7T/Pano-Prato-Quadriculado-Azul.jpg" alt="Instagram Foto" />
            <img className="compartilhar__imagens" src="https://i.ibb.co/Bc9hMpt/Pano-Prato-Coracao-Rosa.jpg" alt="Instagram Foto" />
            <img className="compartilhar__imagens" src="https://i.ibb.co/J7pPZ2s/Pano-Prato-Roxo-Claro.jpg" alt="Instagram Foto" />
            <a
              className="compartilhar__botao"
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer">
              Siga-nos
            </a>
          </div>
        </section>
      </section>

      {mensagemPopup && <Popup tipo={mensagemPopup} fechar={() => setMensagemPopup(null)} />}
    </main>
  );
}

export default Home;