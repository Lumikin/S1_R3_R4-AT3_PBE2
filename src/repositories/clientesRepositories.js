import { connection } from "../config/Database.js";

const clientesRepositories = {
  post: async (cliente, telefone, endereco) => {
    
    const conn = await connection.getConnection();
    try {
      await conn.beginTransaction();

      const sqlCli = "INSERT INTO clientes (nome, cpf) VALUES (?,?);";
      const valuesCli = [cliente.nome, cliente.cpf];
      const [rowsCli] = await conn.execute(sqlCli, valuesCli);

      const sqlTel = "INSERT INTO telefone (idCliente, numero) VALUES (?,?);";
      const valuesTel = [rowsCli.insertId, telefone.numero];
      const [rowsTel] = await conn.execute(sqlTel, valuesTel);

      const sqlEnd =
        "INSERT INTO enderecos (idCliente, cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES (?,?,?,?,?,?,?,?);";
      const valuesEnd = [
        rowsCli.insertId,
        endereco.cep,
        endereco.logradouro,
        endereco.numero,
        endereco.complemento,
        endereco.bairro,
        endereco.localidade,
        endereco.uf,
      ];
      console.log(valuesEnd)
      const [rowsEnd] = await conn.execute(sqlEnd, valuesEnd);
      conn.commit();
      return { rowsCli, rowsTel, rowsEnd };
    } catch (error) {
      await conn.rollback();
      throw new Error(error);
    } finally {
      await conn.release();
    }
  },

  put: async (categoria) => {
    const sql = "UPDATE categorias SET Nome=?, Descricao=? WHERE id=?;";
    const values = [categoria.nome, categoria.descricao, categoria.id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },

  get: async () => {
    const sql =
      "SELECT c.id, t.numero, e.cidade, e.cep, e.logradouro ,e.numero, e.complemento, e.bairro, e.cidade \
    FROM clientes AS c \
    INNER JOIN telefones AS t \
	ON c.Id = t.idCliente \
INNER JOiN enderecos AS e \
	ON c.Id = e.idCliente";
    const [rows] = await connection.execute(sql);
    return rows;
  },

  getId: async (id) => {
        const sql =
      "SELECT c.id, t.numero, e.cidade, e.cep, e.logradouro ,e.numero, e.complemento, e.bairro, e.cidade \
    FROM clientes AS c \
    INNER JOIN telefones AS t \
	ON c.Id = t.idCliente \
INNER JOiN enderecos AS e \
	ON c.Id = e.idCliente\
  WHERE c.id = ?";
    const value = [id];
    const [rows] = await connection.execute(sql, value);
    return rows;
  },

  delete: async (id) => {
    const sql = "DELETE FROM categorias WHERE id=?;";
    const values = [id];
    const [rows] = await connection.execute(sql, values);
    return rows;
  },
};

export default clientesRepositories;
