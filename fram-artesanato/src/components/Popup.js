import React from 'react';
import { Link } from 'react-router-dom';

const Popup = ({ tipo, fechar }) => {
  if (!tipo) return null;

  const mensagens = {
    adicionado: {
      titulo: 'Produto Adicionado ao Carrinho!',
      descricao: 'Seu produto foi adicionado com sucesso.',
      botoes: (
        <>
          <button onClick={fechar}>Voltar às Compras</button>
          <Link to="/carrinho">Ver Carrinho</Link>
        </>
      ),
    },
    jaAdicionado: {
      titulo: 'Produto Já Adicionado ao Carrinho!',
      descricao: 'Este produto já está no seu carrinho.',
      botoes: (
        <>
          <button onClick={fechar}>Voltar às Compras</button>
          <Link to="/carrinho">Ver Carrinho</Link>
        </>
      ),
    },
    contaCriada: {
      titulo: 'Conta Criada',
      descricao: 'Parabéns, sua conta foi criada com sucesso.',
      botoes: <button onClick={fechar}>Ir para as compras</button>,
    },
    emailEmUso: {
      titulo: 'Opa, esse E-Mail já está em uso',
      descricao: 'Por favor reveja seu E-Mail.',
      botoes: <button onClick={fechar}>Corrigir E-Mail</button>,
    },
    preenchaCampos: {
      titulo: 'Opa, falta algo',
      descricao: 'Por favor preencha todos os campos corretamente.',
      botoes: <button onClick={fechar}>Ver campos</button>,
    },
    Ops: {
      titulo: 'Opa, algo deu errado',
      descricao: 'Tente novamente mais tarde.',
      botoes: (
        <>
          <button onClick={fechar}>Voltar às Compras</button>
          <Link to="/Home">Voltar</Link>
        </>
      ),
    },
  };

  const { titulo, descricao, botoes } = mensagens[tipo] || {};

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>{titulo}</h3>
        <p>{descricao}</p>
        <div className="botoes__popup">{botoes}</div>
      </div>
    </div>
  );
};

export default Popup;