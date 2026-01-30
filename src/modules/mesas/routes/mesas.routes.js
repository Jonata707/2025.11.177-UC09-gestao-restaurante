import express from "express"
import { MesasController } from "../controllers/mesas.controller.js";
import authMiddleware from "../../../middleware/authMiddleware.js";
import autorization from "../../../middleware/autorizationMiddleware.js";


const router = express.Router()

router.get("/", MesasController.listar)
router.post("/",authMiddleware,autorization["admin"], MesasController.criar)
router.put("/:id",authMiddleware,autorization["admin"], MesasController.editar)
router.delete("/:id",authMiddleware,autorization["admin"], MesasController.excluir)

export default router;