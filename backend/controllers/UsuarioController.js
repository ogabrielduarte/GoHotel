import { Usuario } from "../models/negocio/Usuario.js";
import { UsuarioDAO } from "../models/persistencia/UsuarioDAO.js";

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

    async buscar(req, res) {
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
