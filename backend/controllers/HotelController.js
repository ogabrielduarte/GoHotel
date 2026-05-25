import { Hotel } from "../models/negocio/Hotel.js";
import { HotelDAO } from "../models/persistencia/HotelDAO.js";

export class HotelController {
    async cadastrar(req, res) {
        try {

            const hotel = new Hotel(req.body);

            const dao = new HotelDAO();

            const id = await dao.cadastrar(hotel);

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
            const id = req.params.id;

            const dao = new HotelDAO();

            const hotel = await dao.buscarPorId(id);

            res.status(201).json({
                hotel
            });

        } catch (e) {
            res.status(400).json({
                erro: e.message || e
            });
        }
    }

    async atualizar(req, res) {
        try {
            const id = req.params.id;

            const dao = new HotelDAO();

            if (!id) {
                res.status(400).json({
                    erro: 'O usuário não existe'
                });
            }

            const dados = req.body;

            if (Object.keys(dados).length === 0) {
                res.status(400).json({
                    erro: 'Não há atualizações'
                });
            }

            const update = await dao.atualizar(dados);

            res.status(201).json({
                update
            });

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
                    erro: 'O hotel não existe'
                });
            }

            const dao = new HotelDAO();

            const DELETE = await dao.deletar(id);

            res.status(200).json(DELETE);

        } catch (e) {
            res.status(400).json({
                erro: e.message || e
            });
        }
    }
}