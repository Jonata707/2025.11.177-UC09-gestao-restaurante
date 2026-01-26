import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function authMiddleware  (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token){
        return res.status(400).json({msg: "Token não fornecido."});
    }
    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuario;
        return next();
    } catch (error) {
        return res.status(403).json({msg: "Token inválido ou expirado."})
    }

};