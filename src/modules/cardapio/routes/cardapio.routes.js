import express from "express"
import { CardapioController } from "../controllers/cardapio.controller.js";
import authMiddleware from "../../../middleware/authMiddleware.js";
import autorization from "../../../middleware/autorizationMiddleware.js";

const router = express.Router()

router.get("/", CardapioController.listar)
router.post("/",authMiddleware,autorization["admin"], CardapioController.criar)
router.put("/:id",authMiddleware,autorization["admin"], CardapioController.editar)
router.delete("/:id",authMiddleware,autorization["admin"], CardapioController.excluir)

export default router;