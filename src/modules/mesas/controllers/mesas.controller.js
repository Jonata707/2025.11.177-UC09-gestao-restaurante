import MesasModel from '../models/mesas.model.js';

export class MesasController{
    static async listar(req, res){
try {
        const mesas = await MesasModel.findAll();
        if(!mesas || mesas.length === 0){
            return res.status(206).json({msg: "Nenhuma mesa encontrada."})
        }
        res.status(200).json(mesas)
     } catch (error) {
        res.status(500).json({erro: "Erro interno ao tentar listar as mesas, tente novamente mais tarde.", detalhes: error.message})
     }
    }
    static async criar(req, res){
try {
      const { numero, capacidade, usuario_id} = req.body ;
    if(!numero || !capacidade || !usuario_id) {
        return res.status(406).json({msg: "Todos os campos são obrigatórios."})
    }
    const mesa = await MesasModel.create({
        numero: numero,
        capacidade: capacidade,
        usuario_id: usuario_id
    })
    res.status(201).json({msg: "Mesa criada com sucesso.", mesa: mesa})
     } catch (error) {
          res.status(500).json({erro: "Erro interno ao tentar criar o mesa, tente novamente mais tarde.", detalhes: error.message})
     }
    }
    static async editar(req, res){
try {
          const { numero, capacidade, usuario_id} = req.body ;
          const id = req.params.id
          await MesasModel.update({
        numero: numero,
                capacidade: capacidade,
        usuario_id: usuario_id
          },
         {
            where:{
                id: id
            }
         })
         res.status(200).json({msg: "Mesa atualizado com sucesso."})

        
     } catch (error) {
        res.status(500).json({erro: "Erro interno ao tentar editar esta mesa, tente novamente mais tarde.", detalhes: error.message})
     }
    }
    static async excluir(req, res){
try {
        const {id} = req.params
        await MesasModel.destroy({
            where:{
                id: id
            }
        })
         res.status(200).json({msg: "Mesas excluído com sucesso."})
     } catch (error) {
        res.status(500).json({erro: "Erro interno ao tentar excluir a mesa, tente novamente mais tarde.", detalhes: error.message})
     }
    }
}