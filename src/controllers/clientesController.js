// Imports
import { Clientes } from "../models/Clientes.js";
import { Telefone } from "../models/Telefone.js";
import { Enderecos } from "../models/Enderecos.js";
import clientesRepositories from "../repositories/clientesRepositories.js";
import { limparNumero } from "../utils/limparNumero.js";
import { validarCPF } from "../utils/validarCPF.js";

const clienteController = {
  selecionar: async (req, res) => {
    try {
      const result = await clientesRepositories.get();
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Essa tabela não contem registros",
        });
      }
      res.status(201).json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Ocorreu um erro no servidor",
      });
    }
  },
  selecionarId: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const result = await clientesRepositories.getId(id);
      if (result.length === 0) {
        return res.status(200).json({
          Message: "Esse ID não contem registro!",
        });
      }
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
      const { nome, cpf, cep, numero, telefones } = req.body;
      // --- CPF -- //

      const Limpar = limparNumero(cpf);
      if (!validarCPF(cpf)) {
        validarCPF(Limpar(cpf));
        return res.status(400).json({
          Message: "Digite um CPF valido!",
        });
      }
      // --- Clientes --- //

      if (!nome || nome.length < 3) {
        return res.status(400).json({
          Message: "Verifique o nome",
        });
      }

      const cliente = Clientes.criar(nome, cpf);
      // --- telefone --- //

      if (telefones.length != 10) {
        return res.status(400).json({
          Message: "Digite um Telefone válido!",
        });
      }
      const telefone = Telefone.criar(telefones);

      //--- endereco --- //
      //TODO: Arrumar que os dados não estao sendo armazenados nas variaveis

      if (cep.length != 8) {
        return res.status(400).json({
          Message:
            "Insira um CEP válido. \
          Não sabe o seu CEP? http://www.buscacep.correios.com.br/",
        });
      }

      const url = `https://viacep.com.br/ws/${cep}/json`;
      const API = await fetch(url);
      const dadosAPI = await API.json();

      //   "cep": "01001-000",
      //   "logradouro": "Praça da Sé",
      //   "complemento": "lado ímpar",
      //   "unidade": "",
      //   "bairro": "Sé",
      //   "localidade": "São Paulo",
      //   "uf": "SP",
      //   "estado": "São Paulo",
      //   "regiao": "Sudeste",
      //   "ibge": "3550308",
      //   "gia": "1004",
      //   "ddd": "11",
      //   "siafi": "7107"

      const { logradouro, complemento, bairro, localidade, uf } = dadosAPI; // Pega os dados do Json da api

      const endereco = Enderecos.criar(
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        localidade,
        uf,
      );

      const result = await clientesRepositories.post(
        cliente,
        telefone,
        endereco,
      );
      res.status(201).json({ result });
      console.log(result);
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
      const produto = Produtos.editar({ nome, valor, idCategoria }, id);
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

export default clienteController;
