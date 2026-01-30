
import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

//Nome do modelo "Cardapio"
const CardapioModel = sequelize.define(
  'Cardapio',
  {
    id : {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      validate:{
        isUUID:{
            args: 4,
            msg: 'O id deve ser um UUID válido'
        }
      }
    },
    // Model attributes are defined here
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate:{
        len:{
            args: [1, 200],
            msg: 'O nome tem um limite de 200 caracteres.'
        },
        notEmpty:{
            msg: 'O campo de nome não pode ser vazio.'
        }
      }
    },
    descricao: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'A descrição  tem um limite de 100 caracteres.'
            }
        }
    },
    porcao: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'O campo de porção não pode ser vazio.'
            },
            len:{
                args:[1, 2],
                msg: "A porção deve ter 1 ou 2 carcteres."
            }
        }
    },
    preco: {
        type: DataTypes.DECIMAL(12, 3),
        allowNull: false,
        validate:{
            isDecimal:{
                msg: 'O preço não está de acordo com parâmetros.'
            }
        }
    },
    usuario_id: {
      type: DataTypes.UUID,
      references:{
        model: "usuario",
        key: "id"
      }
    }
    
  },
  {
    tableName: 'cardapio',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    deletedAt: 'excluido_em',
    paranoid: true
  },
);

export default CardapioModel;