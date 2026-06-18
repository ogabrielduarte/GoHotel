import { Reserva } from "../models/negocio/Reserva.js";
import { ReservaDAO } from "../models/persistencia/ReservaDAO.js";
import { HotelDAO } from "../models/persistencia/HotelDAO.js";

export class ReservaController {

    async cadastrar(req, res) {

        try {

            const reserva = new Reserva(req.body);

            const dao = new ReservaDAO();
            const daoHotel = new HotelDAO();

            const ocupados = await dao.verificarDisponibilidade(
                reserva.getIdHotel(),
                reserva.getDataEntrada(),
                reserva.getDataSaida()
            );

            const hotel = await daoHotel.buscarPorId(
                reserva.getIdHotel()
            );
            const total = hotel.qtd_quartos;


            if (ocupados >= total) {
                return res.status(403).json({
                    erro: 'Não há quartos disponíveis nesse hotel'
                })
            }

            const id = await dao.cadastrar(reserva);

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
                    erro: 'A reserva não existe'
                });
            }

            const dao = new ReservaDAO();

            const reserva = await dao.buscaPorId(id);

            res.status(200).json(reserva);

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }

    }

    async listarTodas(req, res) {
        try {

            const dao = new ReservaDAO();


            const reservas = await dao.listarTodas();


            res.status(200).json(reservas);

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
                    erro: 'A reserva não existe'
                });
            }

            const dados = req.body;

            if (Object.keys(dados).length === 0) {
                return res.status(400).json({
                    erro: 'Não há campos atualizados'
                });
            }

            const dao = new ReservaDAO();

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
                    erro: 'A reserva não existe'
                });
            }

            const dao = new ReservaDAO();

            const deletado = await dao.deletar(id);

            res.status(200).json(deletado);

        } catch (e) {

            res.status(400).json({
                erro: e.message || e
            });

        }

    }

}