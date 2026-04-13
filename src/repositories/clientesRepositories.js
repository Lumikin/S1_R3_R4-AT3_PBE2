import { connection } from "../config/Database.js";

const clientesRepositories = {
  criar: async (cliente, telefone, endereco) => {
    const conn = await connection.getConnection();
    try {
      conn.beginTransaction();

      const sqlCli = "INSERT INTO clientes (nome, cpf) VALUES (?,?);";
      const valuesCli = [cliente.nome, cliente.cpf];
      const [rowsCli] = await conn.execute(sqlCli, valuesCli);

      const sqlTel = "INSERT INTO telefone (idCliente, numero) VALUES (?,?);";
      const valuesTel = [rowsCli.insertId, telefone.numero];
      const [rowsTel] = await conn.execute(sqlTel, valuesTel);

      const sqlEnd =
        "INSERT INTO telefone (idCliente, cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES (?,?,?,?,?,?,?,?);";
      const valuesEnd = [
        rowsCli.insertId,
        endereco.cep,
        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.cidade,
        endereco.uf,
      ];
      const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd);

      conn.commit();
      return {};
    } catch (error) {
      conn.rollback();
      throw new Error(error);
    } finally {
      conn.realease();
    }
  },

  editar: async (categoria) => {
    const sql = "UPDATE categorias SET Nome=?, Descricao=? WHERE id=?;";
    const values = [categoria.nome, categoria.descricao, categoria.id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  selecionar: async () => {
    const sql = "SELECT * FROM categorias;";
    const [rows] = await connection.execute(sql);
    return rows;
  },
  selecionarUm: async (id) => {
    const sql = "SELECT * FROM categorias where id=?;";
    const value = [id];
    const [rows] = await connection.execute(sql, value);
    return rows;
  },

  deletar: async (id) => {
    const sql = "DELETE FROM categorias WHERE id=?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },
};

export default clientesRepositories;
