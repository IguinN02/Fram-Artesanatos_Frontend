import React, { createContext, useState } from 'react';

export const CarrinhoContext = createContext();

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState(() => {
    return JSON.parse(localStorage.getItem('carrinho')) || [];
  });

  const atualizarCarrinho = (novoCarrinho) => {
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const adicionarAoCarrinho = (produto) => {
    if (carrinho.some(item => item.idproduto === produto.idproduto)) {
      alert('Este produto já está no carrinho!');
      return;
    }

    atualizarCarrinho([...carrinho, produto]);
  };

  const removerDoCarrinho = (idProduto) => {
    const novoCarrinho = carrinho.filter(produto => produto.idproduto !== idProduto);
    atualizarCarrinho(novoCarrinho);
  };

  const produtoJaNoCarrinho = (idProduto) => carrinho.some(produto => produto.idproduto === idProduto);

  const finalizarCompra = () => {
    if (carrinho.length === 0) return alert("Seu carrinho está vazio.");
    if (!carrinho.some(produto => produto.nome && produto.preco)) return alert("Não há produtos válidos no carrinho.");

    const frete = 10.00;
    let subtotal = 0;
    let mensagem = "*Resumo do Seu Pedido:*\n\n";

    carrinho.forEach((produto, index) => {
      if (!produto.nome || produto.preco == null) return;
      const preco = Number(produto.preco || 0).toFixed(2);
      mensagem += `${index + 1}.  *${produto.nome}* - R$${preco}\n`;
      subtotal += parseFloat(preco);
    });

    const total = subtotal + frete;
    mensagem += `\n*Subtotal:* R$${subtotal.toFixed(2)}\n*Total:* R$${total.toFixed(2)}\n\nObrigado por comprar!\nGostaria de algo mais personalizado?`;

    window.open(`https://wa.me/5511942957858?text=${encodeURIComponent(mensagem)}`, "_blank");
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        produtoJaNoCarrinho,
        finalizarCompra,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};