import React from 'react';
import { Link } from 'react-router-dom';

const Popup = ({ tipo, fechar }) => {
  if (!tipo) return null; 

  const mensagens = {
    adicionado: {
      titulo: 'Produto Adicionado ao Carrinho!',
      descricao: 'Seu produto foi adicionado com sucesso.',
    },
    jaAdicionado: {
      titulo: 'Produto Já Adicionado ao Carrinho!',
      descricao: 'Este produto já está no seu carrinho.',
    },
  };

  const { titulo, descricao } = mensagens[tipo] || {};

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>{titulo}</h3>
        <p>{descricao}</p>
        <div className="botoes__popup">
          <button onClick={fechar}>Voltar às Compras</button>
          <Link to="/carrinho">Ver Carrinho</Link>
        </div>
      </div>
    </div>
  );
};

export default Popup;