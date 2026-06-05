import { Hotel } from "../models/negocio/Hotel.js";
import { HotelDAO } from "../models/persistencia/HotelDAO.js";

export class HotelController {

    async cadastrar(req, res) {
        try {
            const hotel = new Hotel(req.body);
            const dao = new HotelDAO();

            const id = await dao.cadastrar(hotel);

            return res.status(201).json({ id });

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }

    async listarTodos(req, res) {
        try {
            const dao = new HotelDAO();
            const hoteis = await dao.listarTodos();

            return res.status(200).json({ hoteis });

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const dao = new HotelDAO();

            const hotel = await dao.buscarPorId(id);

            return res.status(200).json({ hotel });

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const dados = req.body;

            if (!id) {
                return res.status(400).json({
                    erro: "Hotel não existe"
                });
            }

            if (!dados || Object.keys(dados).length === 0) {
                return res.status(400).json({
                    erro: "Não há atualizações"
                });
            }

            const dao = new HotelDAO();
            const update = await dao.atualizar(id, dados);

            return res.status(200).json({ update });

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    erro: "O hotel não existe"
                });
            }

            const dao = new HotelDAO();
            const result = await dao.deletar(id);

            return res.status(200).json(result);

        } catch (e) {
            return res.status(500).json({
                erro: e.message || e
            });
        }
    }
}