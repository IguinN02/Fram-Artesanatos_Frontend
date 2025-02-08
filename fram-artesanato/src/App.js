import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import { CarrinhoProvider } from "./context/CarrinhoContext.js";
import ScrollToTop from "./components/ScrollTop.js";

import Home from "./pages/Home.js";
import Produto from "./pages/Produto.js";
import SobreNos from "./pages/SobreNos.js";
import Carrinho from "./pages/Carrinho.js";
import TodosProdutos from "./pages/TodosProdutos.js";
import GerenciarProdutos from "./pages/GerenciarProdutos.js";
import Cadastro from "./pages/Cadastro.js";
import Login from "./pages/Login.js";
import Perfil from "./pages/Perfil.js";

function App() {
  return (
    <CarrinhoProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id/:nome" element={<Produto />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/TodosProdutos" element={<TodosProdutos />} />
          <Route path="/GerenciarProdutos" element={<GerenciarProdutos />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Perfil" element={<Perfil />} />
        </Routes>
        <Footer />
      </Router>
    </CarrinhoProvider>
  );
}

export default App;