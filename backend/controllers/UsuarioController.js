import { Usuario } from "../models/negocio/Usuario.js";
import { UsuarioDAO } from "../models/persistencia/UsuarioDAO.js";

import { criarMensagemBemVindo } from "../services/emails/EmailBemVindo.js";
import { sendEmail } from "../services/EmailService.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsuarioController {

    async cadastrar(req, res) {
        try {
            const usuario = new Usuario(req.body);
            const dao = new UsuarioDAO();

            const id = await dao.cadastrar(usuario);

            const token = jwt.sign(
                {
                    id,
                    email: usuario.email
                },

                process.env.JWT_SECRET,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN
                }
            );

            const usuarioSemSenha = {
                id,
                nome: usuario.getNome(),
                email: usuario.getEmail(),
                genero: usuario.getGenero(),
                receberEmails: usuario.getReceberEmails()
            };

            return res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso",
                token,
                usuario: usuarioSemSenha
            });

            if (usuario.getReceberEmails() === 1) {
                let mail = await criarMensagemBemVindo();
                await sendEmail(usuario.getEmail(), mail.subject, mail.html);
            }

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    erro: "Email e senha são obrigatórios"
                });
            }

            const dao = new UsuarioDAO();
            const usuario = await dao.login(email);

            if (!usuario) {
                return res.status(401).json({
                    erro: "Usuário não encontrado"
                });
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaValida) {
                return res.status(401).json({
                    erro: "Senha inválida"
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

            // evita expor senha
            const { senha: _, ...usuarioSemSenha } = usuario;

            return res.status(200).json({
                mensagem: "Login realizado com sucesso",
                token,
                usuario: usuarioSemSenha
            });

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }

    async listarTodos(req, res) {
        try {
            const dao = new UsuarioDAO();
            const usuarios = await dao.listarTodos();

            if (!usuarios || usuarios.length === 0) {
                return res.status(404).json({
                    erro: "Nenhum usuário cadastrado"
                });
            }

            return res.status(200).json({ usuarios });

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const id = Number(req.params.id);

            if (!id) {
                return res.status(400).json({
                    erro: "ID inválido"
                });
            }

            const dao = new UsuarioDAO();
            const usuario = await dao.buscaPorId(id);

            if (!usuario) {
                return res.status(404).json({
                    erro: "Usuário não encontrado"
                });
            }

            return res.status(200).json(usuario);

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }

    async atualizar(req, res) {
        try {
            const id = Number(req.params.id);
            const dados = req.body;

            if (!id) {
                return res.status(400).json({
                    erro: "ID inválido"
                });
            }

            if (!dados || Object.keys(dados).length === 0) {
                return res.status(400).json({
                    erro: "Não há campos para atualizar"
                });
            }

            const dao = new UsuarioDAO();
            const update = await dao.atualizar(dados, id);

            return res.status(200).json(update);

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }

    async deletar(req, res) {
        try {
            const id = Number(req.params.id);

            if (!id) {
                return res.status(400).json({
                    erro: "ID inválido"
                });
            }

            const dao = new UsuarioDAO();
            const result = await dao.deletar(id);

            return res.status(200).json(result);

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }
}