import React, { useEffect } from 'react';

const SobreNos = () => {

  const rolarParaSecao = (id) => {
    const elementoAlvo = document.getElementById(id);
    if (elementoAlvo) {
      window.scrollTo({
        top: elementoAlvo.offsetTop - window.innerHeight * 0.02,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    document.title = 'Fran Artesanatos - Sobre Nós';
  }, []);

  return (
    <main className="principal margin_fixed">
      <section className="opcoes">
        <div className="opcao">
          <button
            className="sobre__contato opcao__sobre"
            onClick={() => rolarParaSecao('sobre_nos')}
          >
            <p className="titulo__botao">Sobre Nós</p>
          </button>
          <button
            className="sobre__contato opcao__contato"
            onClick={() => rolarParaSecao('contato')}
          >
            <p className="titulo__botao">Contate-nos</p>
          </button>
        </div>
      </section>

      <section className="background__branco background__sobre">
        <section className="sobre info" id="sobre_nos">
          <h2 className="titulo">Sobre Nós</h2>
          <p className="texto">
            A Fran Artesanatos nasceu do hobby de uma pequena empreendedora apaixonada por criar. O que começou como uma simples atividade para o coração logo se transformou em uma loja dedicada a transformar sonhos em realidade. Aqui, cada peça é feita com carinho, cuidado e atenção aos detalhes, sempre buscando deixar uma marca especial na vida de nossos clientes.

            Nossa missão é oferecer itens únicos e personalizados que refletem sua essência, celebram momentos especiais e trazem mais encanto para o seu dia a dia. Cada criação é pensada para contar uma história — a sua!
          </p>
        </section>

        <section className="contato info" id="contato">
          <h2 className="titulo">Contate-nos</h2>
          <p className="texto">
            Tem alguma dúvida, deseja fazer um pedido especial ou saber mais sobre nossos produtos? Estamos aqui para ajudar! Entre em contato conosco e teremos o maior prazer em atender você.
          </p>

          <p className="contato__numero contatos">
            <a href="https://wa.me/5511942957858" target="_blank" rel="noopener noreferrer">Telefone: +55 (11) 94295-7858</a>
          </p>
          <p className="contato__email contatos">
            <a href="mailto:framartesanatos00@gmail.com?subject=Duvida&body=Gostaria de saber mais sobre seus serviços." target="_blank" rel="noopener noreferrer">E-Mail: franartesanatos00@gmail.com</a>
          </p>
        </section>
      </section>
    </main>
  );
};

export default SobreNos;