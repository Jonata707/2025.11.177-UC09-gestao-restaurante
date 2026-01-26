const { DataTypes } = require('sequelize');
import { DataTypes } from 'sequelize';
import sequelize from '../db/config.js';

//Nome do modelo "Usuario"
const UsuarioModel = sequelize.define(
  'Usuario',
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
    matricula:{
      type: DataTypes.STRING(5),
      allowNull: false,
      validate:{
        is: '^[A-Za-z][0-9]{4}$',
        msg: 'A matrícula deve seguir os parâmetros.'

      }
    },
    email :{
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false,
        validate:{
            isEmail:{
                args: true,
                msg: 'O campo do email deve ser um email válido.'
            }
        }
    },
    telefone: {
      type: DataTypes.NUMBER,
      allowNull: false,
      validate:{
        isNumeric:{
            msg: 'Os dígiyos do telefone não estão de acordo com os parâmetros.'
        }
      }
    },
    perfil : {
        type: DataTypes.ENUM('admin', 'seller', 'cliente'),
        allowNull: false,
        validate:{
            isIn:{
                args: [['admin', 'seller', 'cliente']],
                msg: 'O perfil deve ser admin, seller ou cliente.'
            }
        }
    },
    senha : {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate:{
            is: '^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%?])[A-Za-z\d@!#$%?]+$',
            msg: 'A senha deve ter no minimo 8 caracteres, uma letra maiuscula, uma letra minuscula, um numero e um caracter especial.'
        }

    }
  },
  {
    tableName: 'usuario',
    createdat: 'criado_em',
    updatedat: 'atualizado_em',
    deletedAt: 'excluido_em',
  },
);

export default UsuarioModel;