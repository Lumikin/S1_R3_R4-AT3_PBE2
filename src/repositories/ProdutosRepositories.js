import { connection } from "../config/Database.js";

const produtoRepository = {
  criar: async (produto) => {
    const sql =
      "INSERT INTO produtos (nome,idCategorias, valor, caminhoImagem) VALUES (?,?,?,?);";
    const values = [
      produto.nome,
      produto.idCategoria,
      produto.valor,
      produto.caminhoImagem,
    ];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  editar: async (produto) => {
    const sql =
      "UPDATE produtos SET nome=?, idCategorias=?, valor=? WHERE id=?;";
    const values = [
      produto.nome,
      produto.idCategoria,
      produto.valor,
      produto.id,
    ];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  selecionarCategoria: async (id) => {
    const sql = "SELECT * FROM categorias where id=?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },
  selecionar: async () => {
    const sql = "SELECT * FROM produtos;";
    const [rows] = await connection.execute(sql);
    return rows;
  },

  deletar: async (id) => {
    const sql = "DELETE FROM produtos WHERE id=?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },
};

export default produtoRepository;
