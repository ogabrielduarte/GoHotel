import { Usuario } from "../models/negocio/Usuario.js";
import { UsuarioDAO } from "../models/persistencia/UsuarioDAO.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsuarioController {
    async cadastrar(req, res) {
        try {

            const usuario = new Usuario(req.body);

            const dao = new UsuarioDAO();

            const id = await dao.cadastrar(usuario);

            res.status(201).json({
                id
            });

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }
    }

    async login(req, res) {

        try {

            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    erro: 'Email e senha são obrigatórios'
                });
            }

            const dao = new UsuarioDAO();

            const usuario = await dao.login(email);

            if (!usuario) {
                return res.status(401).json({
                    erro: 'Usuário não encontrado'
                });
            }

            const senhaValida = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaValida) {
                return res.status(401).json({
                    erro: 'Senha inválida'
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            );

            delete usuario.senha;

            res.status(200).json({
                mensagem: 'Login realizado com sucesso',
                token
            });

        } catch (e) {

            res.status(500).json({
                erro: e.message || e
            });

        }

    }

    async listarTodos(req, res) {
        try {
            const dao = new UsuarioDAO();

            const users = await dao.listarTodos();
            
            if(users.length < 0) {
                res.status(400).json({
                    erro: 'sem usuários cadastrados'
                });
            }

            res.status(201).json({ users })

        } catch (e) {

            return res.status(400).json({
                erro: e.message || e
            });
            
        }
    } 

    async buscarPorId(req, res) {
        try {

            const id = Number(req.params.id);

            if (!id) {
                return res.status(400).json({
                    erro: 'O usuário não existe'
                });
            }

            const dao = new UsuarioDAO();

            let usuario = await dao.buscaPorId(id);

            res.status(201).json(usuario);

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }
    }

    async atualizar(req, res) {
        try {

            const id = req.params.id;

            if (!id) {
                return res.status(400).json({
                    erro: 'O usuário não existe'
                });
            }


            const dados = req.body;

            if (Object.keys(dados).length === 0) {
                return res.status(400).json({
                    erro: 'Não há campos atualizados'
                });
            }


            const dao = new UsuarioDAO();

            let update = await dao.atualizar(dados, id);

            res.status(201).json(update);

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }
    }

    async deletar(req, res) {

        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({
                    erro: 'O usuário não existe'
                });
            }

            const dao = new UsuarioDAO();

            const DELETE = await dao.deletar(id);

            res.status(200).json(DELETE);

        } catch (e) {
            res.status(400).json({
                erro: e.message || e
            });
        }
    }
}
