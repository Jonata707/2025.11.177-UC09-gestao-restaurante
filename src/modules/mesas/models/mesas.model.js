const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

//Nome do modelo "Mesas"
const MesasModel = sequelize.define(
  'Mesas',
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
    numero: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validation:{
            isNumeric:{
            msg: 'O número da mesa não está de acordo com os parâmetros.'
            }
        }
    },
    capacidade: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validation:{
            isNumeric:{
            msg: 'O número da mesa não está de acordo com os parâmetros.'
            }
        }
    }

  },
  {
    tableName: 'mesas',
    createdat: 'criado_em',
    updatedat: 'atualizado_em',
    deletedAt: 'excluido_em',
  },
);

export default MesasModel;