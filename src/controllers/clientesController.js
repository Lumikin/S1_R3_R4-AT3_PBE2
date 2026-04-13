import { Clientes } from "../models/Clientes.js";
import { Telefone } from "../models/Telefone.js";
import clientesRepositories from "../repositories/clientesRepositories.js";
import telefoneRepositories from "../repositories/telefoneReposiotries.js";

const clienteController = {
  select: async (req, res) => {
    try {
      const result = await clientesRepositories.select();
      if (result.length === 0) {
        return res
          .status(200)
          .json({ Message: "Nessa tabela não contem registros" });
      }
      res.status(201).json({ result });
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro no servidor", error });
    }
  },
  selectTelefone: async (req, res) => {
    try {
      const result = await telefoneRepositories.select();
      if (result.length === 0) {
        return res
          .status(200)
          .json({ Message: "Nessa tabela não contem registros" });
      }
    } catch (error) {
      res.status(500).json({ message: "Ocorreu um erro no servidor", error });
    }
  },
};

export default clienteController;
