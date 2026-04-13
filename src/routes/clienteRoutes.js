import { Router } from "express";
import clienteController from "../controllers/clientesController.js";

const clienteRoutes = Router();

clienteRoutes.get("/", clienteController.select);
clienteRoutes.get("/telefones", clienteController.selectTelefone);

export default clienteRoutes;
