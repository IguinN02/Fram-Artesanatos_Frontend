import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CarrinhoContext } from '../context/CarrinhoContext.js';
import Popup from '../components/Popup.js';

const TodosProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const { adicionarAoCarrinho, produtoJaNoCarrinho } = useContext(CarrinhoContext);

  useEffect(() => {
    document.title = 'Fram Artesanatos - Todos os Produtos';
    axios
      .get('https://fram-artesanatos-backend.onrender.com/produto')
      .then(({ data }) => setProdutos(data))
      .catch((erro) => console.error('Erro ao buscar os produtos:', erro));
  }, []);

  const handleAdicionarAoCarrinho = (produto) => {
    const mensagem = produtoJaNoCarrinho(produto.idproduto) ? 'jaAdicionado' : 'adicionado';
    setPopupMessage(mensagem);
    if (!produtoJaNoCarrinho(produto.idproduto)) {
      adicionarAoCarrinho(produto);
    }
    setTimeout(() => setPopupMessage(null), 6000);
  };

  return (
    <div>
      <main className="principal margin_fixed">
        <section className="produtos">
          {produtos.map(({ idproduto, imagens, nome, descricao, preco }) => (
            <div key={idproduto} className="produtos__1">
              <Link to={`/produto/${idproduto}/${encodeURIComponent(nome)}`} className="produto__link">
                <img className="produto__img" src={imagens} alt={nome} />
                <div className="produto__info">
                  <h3 className="produto__titulo">{nome}</h3>
                  <p className="produto__descricao">{descricao}</p>
                  <p className="produto__valor">R${Number(preco).toFixed(2)}</p>
                </div>
              </Link>
              <button
                className="adicionar__carrinho"
                onClick={() => handleAdicionarAoCarrinho({ idproduto, imagens, nome, descricao, preco })}
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </section>
      </main>

      <Popup tipo={popupMessage} fechar={() => setPopupMessage(null)} />
    </div>
  );
};

export default TodosProdutos;