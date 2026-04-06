import { Router } from "express";
import categoriaController from "../controllers/categoriaController.js";

const categoriaRoutes = Router();

categoriaRoutes.get("/", categoriaController.selecionar);
categoriaRoutes.get("/:id", categoriaController.selecionarUm);
categoriaRoutes.post("/", categoriaController.criar);
categoriaRoutes.put("/", categoriaController.atualizar);
categoriaRoutes.delete("/:id", categoriaController.deletar);

export default categoriaRoutes;
