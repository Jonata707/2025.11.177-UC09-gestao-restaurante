
import { DataTypes } from 'sequelize';
import sequelize from '../../../config/database.js';

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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNumeric:{
        msg: 'O número da mesa não está de acordo com os parâmetros.'
        }
      }
    },
    capacidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt:{
          msg: 'A capacidade da mesa não pode estar vazia.'
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
    tableName: 'mesas',
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
    deletedAt: 'excluido_em',
    paranoid: true
  },
);

export default MesasModel;