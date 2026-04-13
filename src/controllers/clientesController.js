import { Clientes } from "../models/Clientes.js";
import { Telefone } from "../models/Telefone.js";
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
      const { nome, cpf, cep, numero, telefone } = req.body;
      // --- CPF -- //

      limparNumero(cpf);
      if (!validarCPF(cpf)) {
        return res.status(400).json({
          Message: "Digite um CPF valido!",
        });
      }

      // --- telefone --- //

      if (telefone.length != 10) {
        return res.status(400).json({
          Message: "Digite um Telefone válido!",
        });
      }

      //--- endereco --- //

      if (cep.length != 8) {
        return res.status(400).json({
          Message:
            "Insira um CEP válido. \
          Não sabe o seu CEP? http://www.buscacep.correios.com.br/",
        });
      }

      const url = `https://viacep.com.br/ws/${cep}/json`;
      const API = await fetch(url, { method: "POST" });

      
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
