import React, { useContext, useEffect } from 'react';
import { CarrinhoContext } from '../context/CarrinhoContext.js';
import { Link } from 'react-router-dom';

const Carrinho = () => {
  const { carrinho, removerDoCarrinho, finalizarCompra } = useContext(CarrinhoContext);

  useEffect(() => {
    document.title = 'Fram Artesanatos - Carrinho';
  }, []);

  return (
    <div>
      <main className="principal margin_fixed">
        <section className="carrinho">
          {carrinho.length === 0 ? (
            <p className="titulo__carrinho titulo__novidades vazio">Seu carrinho está vazio!</p>
          ) : (
            <>
              <h2 className="titulo__carrinho titulo__novidades vazio">Seus Produtos</h2>
              {carrinho.map(({ idproduto, imagens, nome, descricao, preco }) => (
                <div key={idproduto} className="produto__carrinho">
                  <Link to={`/produto/${idproduto}/${encodeURIComponent(nome)}`} className="produto__link">
                    <img className="produto__img" src={imagens} alt={nome} />
                    <div className="produto__info">
                      <h3 className="produto__titulo">{nome}</h3>
                      <p className="produto__descricao">{descricao}</p>
                      <p className="produto__valor">
                        R${Number(preco).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                  <button
                    onClick={() => removerDoCarrinho(idproduto)}
                    className="remover__carrinho adicionar__carrinho"
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button
                className="comprar"
                onClick={finalizarCompra}
              >
                Finalizar Compra
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default Carrinho;