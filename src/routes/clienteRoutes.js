import { Router } from "express";
import clienteController from "../controllers/clientesController.js";

const clienteRoutes = Router();

clienteRoutes.get("/", clienteController.selecionar);
clienteRoutes.post("/", clienteController.criar);
clienteRoutes.get("/:id", clienteController.selecionarId);
// clienteRoutes.get("/telefones", clienteController.selectTelefone);

export default clienteRoutes;
