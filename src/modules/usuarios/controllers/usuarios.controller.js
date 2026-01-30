import UsuariosModel from '../models/usuarios.models.js';
import dotenv from "dotenv/config";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export default class UsuariosController {
    static async listar(req, res) {
        try {
            const usuario = await UsuariosModel.findAll(
                {
                    attributes: {
                        exclude: ["senha"]
                    }
                }
            )
            if (!usuario) {
                return res.status(406).json({ msg: "Nenhum usuário encontrado." })
            }
            res.status(200).json(usuario)
        } catch (error) {
            res.status(500).json({ erro: "Erro interno ao tentar listar os usuários, tente novamente mais tarde.", detalhes: error.message })
        }
    }
    static async perfil(req, res) {
        try {
            return res.json({
                msg: "Acesso realizado.",
                usuario: req.usuario
            })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno ao tentar entrar no perfil, tente novamente mais tarde.", detalhes: error.message })
        }
    }
    static async criar(req, res) {
        try {
            const { nome, matricula, telefone, senha, perfil, email } = req.body;
            const usuario = await UsuariosModel.create({
                nome: nome,
                matricula: matricula,
                telefone: telefone,
                senha: senha,
                perfil: perfil,
                email: email

            })
            if (!nome || !matricula || !telefone || !senha || !perfil || !email) {
                return res.status(406).json({ msg: "Todos os campos são obrigatórios." })
            }
            res.status(201).json({ msg: "Usuário criado com sucesso.", usuario: usuario })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno ao tentar criar o usuário, tente novamente mais tarde.", detalhes: error.message })
        }
    }
    static async editar(req, res) {
        try {
            const { nome, matricula, telefone, senha, perfil, email } = req.body;
            const id = req.params.id
            await UsuariosModel.update({
                nome: nome,
                matricula: matricula,
                telefone: telefone,
                senha: senha,
                perfil: perfil,
                email: email
            },
                {
                    where: {
                        id: id
                    }
                })
            res.status(200).json({ msg: "Usuário atualizado com sucesso." })


        } catch (error) {
            res.status(500).json({ erro: "Erro interno ao tentar editar o usuário, tente novamente mais tarde.", detalhes: error.message })
        }
    }
    static async excluir(req, res) {
        try {
            const { id } = req.params
            await UsuariosModel.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({ msg: "Usuário excluído com sucesso." })
        } catch (error) {
            res.status(500).json({ erro: "Erro interno ao tentar excluir o usuário, tente novamente mais tarde.", detalhes: error.message })
        }
    }
    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ msg: "Email e senha são obrigatorios." })
            }
            const login = await UsuariosModel.findOne({
                where: { email: email }
            })
            if (!login) {
                return res.status(401).json({ msg: "Usuário não encontrado." })
            }
            const senhaValida = await bcrypt.compare(senha, login.senha);
            if (!senhaValida) {
                return res.status(401).json({ erro: "email ou senha incorreta." })
            }
            const token = jwt.sign({
                id: login.id,
                email: login.email,
                perfil: login.perfil
            },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            )
            return res.status(200).json({ msg: "Login feito com sucesso.", token })

        } catch (error) {
            res.status(500).json({ erro: "Erro interno ao tentar logar, tente novamente mais tarde.", detalhes: error.message })
        }
    }
    static async criarAdmin(req, res) {
        try {
            const senhaHash = await bcrypt.hash(process.env.SENHA_SUPER_ADMIN, 10)
            const usuario = await UsuariosModel.create({
                nome: process.env.NOME_SUPER_ADMIN,
                matricula: process.env.MATRICULA_SUPER_ADMIN,
                telefone: process.env.TELEFONE_SUPER_ADMIN,
                senha: senhaHash,
                perfil: 'admin',
                email: process.env.EMAIL_SUPER_ADMIN
            })

            res.status(201).json({ msg: 'Usuário criado com sucesso.', usuario: usuario });


        } catch (error) {
            res.status(500).json({ erro: 'Erro interno ao criar admin.', detalhes: error.message });

        }
    }
}
