import { connection } from "../config/Database.js";

const telefoneRepositories = {
    select: async () => {
        const sql = "SELECT * FROM telefones;";
    const [rows] = await connection.execute(sql);
    return rows;
    }
}
export default telefoneRepositories