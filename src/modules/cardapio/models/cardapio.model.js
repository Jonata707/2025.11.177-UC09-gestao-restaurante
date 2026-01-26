const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

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
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:{
            args: [2, 100],
            msg: 'O nome deve ter no minimo dois caracteres e no maximo 100 caracteres.'
        },
        notEmpty:{
            msg: 'O campo de nome não pode ser vazio.'
        }
      }
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args: [2, 100],
                msg: 'A descrição deve ter no minimo dois caracteres e no maximo 100 caracteres.'
            }
        }
    },
    tamanho: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                args: [2, 3],
                msg: 'O nome deve ter no minimo dois caracteres e no maximo 3 caracteres.'
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
    }
    
  },
  {
    tableName: 'cliente',
    createdat: 'criado_em',
    updatedat: 'atualizado_em',
    deletedAt: 'excluido_em',
  },
);

export default CardapioModel;