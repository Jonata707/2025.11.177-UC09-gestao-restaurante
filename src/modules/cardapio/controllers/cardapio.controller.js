import CardapioModel from '../models/cardapio.model.js';

export class CardapioController{
    static async listar(req, res){
try {
        const itens = await CardapioModel.findAll();
        if(!itens || itens.length === 0){
            return res.status(206).json({msg: 'Nenhum item do cardápio encontrado.'})
        }
        return res.status(200).json(itens)
     } catch (error) {
        res.status(500).json({erro: "Erro interno ao tentar listar as mesas, tente novamente mais tarde.", detalhes: error.message})
     }
    }
    static async criar(req, res){
try {
      const { nome, descricao, porcao, preco, usuario_id } = req.body ;
    const cardapios = await CardapioModel.create({
        nome: nome,
        descricao: descricao,
        porcao: porcao,
        preco: preco,
        usuario_id: usuario_id
    })
    if(!nome || !descricao || !porcao || !preco || !usuario_id) {
        return res.status(406).json({msg: "Todos os campos são obrigatórios."})
    }
    res.status(201).json({msg: "Cardápio criado com sucesso.", cardapio: cardapios})
     } catch (error) {
          res.status(500).json({erro: "Erro interno ao tentar criar o cardápio, tente novamente mais tarde.", detalhes: error.message})
     }
    }
    static async editar(req, res){
try {
          const { nome, descricao, porcao, preco, usuario_id } = req.body ;
          const id = req.params.id
          await CardapioModel.update({
        nome: nome,
        descricao: descricao,
        porcao: porcao,
        preco: preco,
        usuario_id: usuario_id
          },
         {
            where:{
                id: id
            }
         })
         res.status(200).json({msg: "Cardápio atualizado com sucesso."})

        
     } catch (error) {
        res.status(500).json({erro: "Erro interno ao tentar editar este cardápio, tente novamente mais tarde.", detalhes: error.message})
     }
    }
    static async excluir(req, res){
try {
        const {id} = req.params
        await CardapioModel.destroy({
            where:{
                id: id
            }
        })
         res.status(200).json({msg: "Cardápio excluído com sucesso."})
     } catch (error) {
        res.status(500).json({erro: "Erro interno ao tentar excluir este cardápio, tente novamente mais tarde.", detalhes: error.message})
     }
    }
}