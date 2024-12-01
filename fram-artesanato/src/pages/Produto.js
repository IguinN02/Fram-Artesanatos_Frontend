import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link, useParams } from 'react-router-dom';
import { CarrinhoContext } from '../context/CarrinhoContext.js';
import Popup from '../components/Popup.js';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Produto() {
  const { id, nome } = useParams();
  const [produto, setProduto] = useState(null);
  const [produtosCarrossel, setProdutosCarrossel] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);

  const { adicionarAoCarrinho, produtoJaNoCarrinho } = useContext(CarrinhoContext);

  useEffect(() => {
    if (nome) document.title = `Fram Artesanatos - ${decodeURIComponent(nome)}`;

    axios.get(`https://fram-artesanatos-backend.onrender.com/produto/${id}`)
      .then(({ data }) => setProduto({
        ...data,
        preco: parseFloat(data.preco),
      }))
      .catch((erro) => console.error("Erro ao buscar produto:", erro));

    axios.get('https://fram-artesanatos-backend.onrender.com/produto')
      .then(({ data }) => {
        const produtosFiltrados = data
          .filter((prod) => prod.idproduto !== parseInt(id)) 
          .map(produto => ({
            ...produto,
            preco: parseFloat(produto.preco), 
          }));
        setProdutosCarrossel(produtosFiltrados.sort(() => 0.5 - Math.random()).slice(0, 5));
      })
      .catch((erro) => console.error("Erro ao buscar produtos para o carrossel:", erro));
  }, [id, nome]);

  const handleAdicionarAoCarrinho = (produto) => {
    const mensagem = produtoJaNoCarrinho(produto.idproduto) ? 'jaAdicionado' : 'adicionado';
    setPopupMessage(mensagem);
    if (!produtoJaNoCarrinho(produto.idproduto)) {
      adicionarAoCarrinho(produto);
    }
    setTimeout(() => setPopupMessage(null), 6000);
  };

  if (!produto || produtosCarrossel.length === 0) return <div>Carregando...</div>;

  return (
    <div>
      <main className="principal margin_fixed">
        <section className="produto">
          <div className="box__produto">
            <div className="center__foto">
              <img className="foto__produto__principal" src={produto.imagens} alt={produto.nome} />
            </div>
            <div>
              <h2 className="nome__produto__principal">{produto.nome}</h2>
              <h3 className="valor__produto__principal">R${Number(produto.preco).toFixed(2)}</h3>
              <p className="descricao__produto__principal">{produto.descricao}</p>
              <p className="descricao__produto__principal">
                Todos os nossos itens podem ser personalizados de acordo com suas preferências! Estamos à disposição para transformar suas ideias em realidade! ✨ </p>
              <button
                className="adicionar__carrinho__produto"
                onClick={() => handleAdicionarAoCarrinho(produto)}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </section>

        <section className="background__branco carrossel__full">
          <section className="principal__novidades mais__vendidos">
            <h2 className="principal__novidades__titulo">
              <img src="/images/global/flor1.svg" alt="flor" />
              <b className="titulo__novidades">Mais Vendidos</b>
              <img src="/images/global/flor2.svg" alt="flor" />
            </h2>
            <p className="principal__novidades__subtitulo">Veja Tudo</p>

            <article className="principal__novidades__carrossel">
              <div className="carrossel__container">
                <div className="swiper mais__vendidos">
                  <div className="swiper-button-prev mais__vendidos"></div>
                  <div className="swiper-button-next mais__vendidos"></div>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={25}
                    slidesPerView={window.matchMedia("(max-width: 1024px)").matches ? 2 : 3}
                    centeredSlides={true}
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation={{
                      prevEl: '.swiper-button-prev.mais__vendidos',
                      nextEl: '.swiper-button-next.mais__vendidos',
                    }}
                  >
                    {produtosCarrossel.map(({ idproduto, imagens, nome, descricao, preco }) => (
                      <SwiperSlide key={idproduto} className="swiper-slide">
                        <Link className="carrossel__imagens" to={`/produto/${idproduto}/${encodeURIComponent(nome)}`}>
                          <img className="img_produto" src={imagens} alt={`Foto do Produto ${nome}`} />
                        </Link>
                        <div className="infos__produto">
                          <Link className="titulo__produto color" to={`/produto/${idproduto}/${encodeURIComponent(nome)}`}>
                            {nome}
                          </Link>
                          <Link className="descricao__produto" to={`/produto/${idproduto}/${encodeURIComponent(nome)}`}>
                            {descricao}
                          </Link>
                          <Link className="valor__produto color" to={`/produto/${idproduto}/${encodeURIComponent(nome)}`}>
                            R${Number(preco).toFixed(2)}
                          </Link>
                          <button
                            className="adicionar__carrinho"
                            onClick={() => handleAdicionarAoCarrinho({ idproduto, nome, descricao, preco, imagens })}
                          >
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
        </section>
      </main>

      <Popup tipo={popupMessage} fechar={() => setPopupMessage(null)} />
    </div>
  );
}

export default Produto;