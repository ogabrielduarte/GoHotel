import { Pagamento } from '../models/negocio/Pagamento.js';
import { PagamentoDAO } from '../models/persistencia/PagamentoDAO.js';

export class PagamentoController {

    async cadastrar(req, res) {

        try {

            const pagamento = new Pagamento(req.body);

            const dao = new PagamentoDAO();

            const id = await dao.cadastrar(pagamento);

            res.status(201).json({
                id
            });

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }

    }

    async buscarPorId(req, res) {

        try {

            const id = Number(req.params.id);

            if (!id) {
                return res.status(400).json({
                    erro: 'Pagamento não existe'
                });
            }

            const dao = new PagamentoDAO();

            const pagamento = await dao.buscaPorId(id);

            res.status(200).json(pagamento);

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }

    }

    async listarTodos(req, res) {

        try {

            const dao = new PagamentoDAO();

            const pagamentos = await dao.listarTodos();

            res.status(200).json(pagamentos);

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }

    }

    async atualizar(req, res) {

        try {

            const id = Number(req.params.id);

            if (!id) {
                return res.status(400).json({
                    erro: 'Pagamento não existe'
                });
            }

            const dados = req.body;

            if (Object.keys(dados).length === 0) {
                return res.status(400).json({
                    erro: 'Não há campos atualizados'
                });
            }

            const dao = new PagamentoDAO();

            const update = await dao.atualizar(dados, id);

            res.status(200).json(update);

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }

    }

    async deletar(req, res) {

        try {

            const id = Number(req.params.id);

            if (!id) {
                return res.status(400).json({
                    erro: 'Pagamento não existe'
                });
            }

            const dao = new PagamentoDAO();

            const deletado = await dao.deletar(id);

            res.status(200).json(deletado);

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }

    }

}