import express from "express"
import UsuariosController from "../controllers/usuarios.controller.js";
import authMiddleware from "../../../middleware/authMiddleware.js";
import autorization from "../../../middleware/autorizationMiddleware.js";


const router = express.Router()

router.post("/login", UsuariosController.login)
router.get("/",authMiddleware,autorization["admin"], UsuariosController.listar)
router.get("/perfil",authMiddleware,autorization["admin"], UsuariosController.perfil)
router.post("/",authMiddleware,autorization["admin"], UsuariosController.criar)
router.put("/:id",authMiddleware,autorization["admin"], UsuariosController.editar)
router.delete("/:id",authMiddleware,autorization["admin"], UsuariosController.excluir)

export default router;