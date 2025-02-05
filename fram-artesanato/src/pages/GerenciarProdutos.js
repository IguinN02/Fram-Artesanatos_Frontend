import React, { useState, useEffect } from 'react';

const GerenciarProdutos = () => {
  useEffect(() => {
    document.title = 'Fran Artesanatos - Gerenciamento de Produtos';
  }, []);

  const [formData, setFormData] = useState({
    NomeProduto: '',
    ValorProduto: '',
    DescricaoProduto: '',
    ImgProduto: '',
    idproduto: '',
  });

  const [modo, setModo] = useState('adicionar');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('https://fram-artesanatos-backend.onrender.com/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NomeProduto: formData.NomeProduto,
          ValorProduto: formData.ValorProduto,
          DescricaoProduto: formData.DescricaoProduto,
          ImgProduto: formData.ImgProduto,
        }),
      });
      const data = await response.json();
      alert(data.message || 'Produto criado com sucesso!');
    } catch (error) {
      alert('Erro ao criar produto!');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://fram-artesanatos-backend.onrender.com/produto/${formData.idproduto}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NomeProduto: formData.NomeProduto || undefined,
          ValorProduto: formData.ValorProduto || undefined,
          DescricaoProduto: formData.DescricaoProduto || undefined,
          ImgProduto: formData.ImgProduto || undefined,
        }),
      });
      const data = await response.json();
      alert(data.message || 'Produto atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar produto!');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://fram-artesanatos-backend.onrender.com/produto/${formData.idproduto}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      alert(data.message || 'Produto excluído com sucesso!');
    } catch (error) {
      alert('Erro ao excluir produto!');
    }
  };

  const handleSubmit = () => {
    if (modo === 'adicionar') {
      handleSave();
    } else if (modo === 'atualizar') {
      handleUpdate();
    } else if (modo === 'excluir') {
      handleDelete();
    }
  };

  return (
    <div>
      <main className="principal margin_fixed">
        <section className="background__branco centralizado_gerenciar">
          <h2 className="titulo__carrinho titulo__novidades">Gerenciar Produtos</h2>

          <div className="login__form_gerenciar">
            <div className='opcao_gerenciar'>
              <label className='radio_gerenciar'>
                <input
                  className='input_radio_gerenciar'
                  type="radio"
                  name="modo"
                  value="adicionar"
                  checked={modo === 'adicionar'}
                  onChange={(e) => setModo(e.target.value)}
                />
                Adicionar
              </label>
              <label className='radio_gerenciar meio_gerenciar'>
                <input
                  className='input_radio_gerenciar'
                  type="radio"
                  name="modo"
                  value="atualizar"
                  checked={modo === 'atualizar'}
                  onChange={(e) => setModo(e.target.value)}
                />
                Atualizar
              </label>
              <label className='radio_gerenciar'>
                <input
                  className='input_radio_gerenciar'
                  type="radio"
                  name="modo"
                  value="excluir"
                  checked={modo === 'excluir'}
                  onChange={(e) => setModo(e.target.value)}
                />
                Excluir
              </label>
            </div>

            {(modo !== 'adicionar') && (
              <input
                className="login__input_gerenciar"
                name="idproduto"
                placeholder="ID do Produto"
                onChange={handleInputChange}
              />
            )}
            {(modo !== 'excluir') && (
              <>
                <input
                  className="login__input_gerenciar"
                  name="NomeProduto"
                  placeholder="Nome do Produto"
                  onChange={handleInputChange}
                />
                <input
                  className="login__input_gerenciar"
                  name="ValorProduto"
                  placeholder="Preço"
                  onChange={handleInputChange}
                />
                <input
                  className="login__input_gerenciar"
                  name="DescricaoProduto"
                  placeholder="Descrição"
                  onChange={handleInputChange}
                />
                <input
                  className="login__input_gerenciar"
                  name="ImgProduto"
                  placeholder="URL da Imagem"
                  onChange={handleInputChange}
                />
              </>
            )}

            <button className="button_gerenciar" onClick={handleSubmit}>
              {modo === 'adicionar' ? 'Salvar' : modo === 'atualizar' ? 'Atualizar' : 'Excluir'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GerenciarProdutos;