import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const TodosProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    document.title = 'Fram Artesanatos - Todos os Produtos';
    axios
      .get('https://fram-artesanatos-backend.onrender.com/produto')
      .then(({ data }) => {
        if (searchQuery) {
          const produtosFiltrados = data.filter((produto) =>
            produto.nome.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProdutos(produtosFiltrados);
        } else {
          setProdutos(data);
        }
      })
      .catch((erro) => console.error('Erro ao buscar os produtos:', erro));
  }, [searchQuery]);

  return (
    <div>
      <main className="principal margin_fixed">
        <section className="produtos">
          {searchQuery && (
            <div className='pesquisa_todos'>
              <p className='texto_pesquisa'>
                Resultados da busca por: "{searchQuery}"
              </p>
            </div>
          )}

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
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TodosProdutos;