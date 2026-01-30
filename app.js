import dotenv from "dotenv/config"
import express from "express"
import sequelize from "./src/config/database.js"
import UsuariosRoutes from "./src/modules/usuarios/routes/usuarios.routes.js";
import MesasRoutes from "./src/modules/mesas/routes/mesas.routes.js";
import CardapioRoutes from "./src/modules/cardapio/routes/cardapio.routes.js";
import UsuariosController from "./src/modules/usuarios/controllers/usuarios.controller.js";


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.post("/", UsuariosController.criarAdmin)
app.use("/cardapio", CardapioRoutes)
app.use("/mesas", MesasRoutes)
app.use("/usuarios", UsuariosRoutes)
app.get("/", (req,res) =>{
    res.status(200).json({msg:"Bem Vindo!"})
})

app.listen(port, async ()=>{
        await sequelize.sync({ force: true, alter: true });
        // cria um admin padrão no startup se necessário
      
        console.log(`http://localhost:${port}`)
})