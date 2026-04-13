import { connection } from "../config/Database.js";

const clientesRepositories = {
  select: async () => {
    const sql = "SELECT * FROM clientes;";
    const [rows] = await connection.execute(sql);
    return rows;
  },
  
};

export default clientesRepositories;