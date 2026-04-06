import { Produtos } from "../models/Produtos.js";
import produtoRepository from "../repositories/ProdutosRepositories.js";

const produtoController = {
  selecionar: async (req, res) => {
    try {
      const result = await produtoRepository.selecionar();
      res.status(201).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  criar: async (req, res) => {
    try {
      const { nome, valor, idCategoria} = req.body;
      const caminhoImagem = req.file.path;
      const produto = Produtos.criar({ nome, valor, idCategoria, caminhoImagem});
      const result = await produtoRepository.criar(produto);
      res.status(201).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  atualizar: async (req, res) => {
    try {
      const id = Number(req.query.id);
      const { nome, valor, idCategoria } = req.body;
      const produto = Produtos.editar({ nome, valor, idCategoria}, id);
      const result = await produtoRepository.editar(produto);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  deletar: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await produtoRepository.deletar(id);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
};
export default produtoController;
