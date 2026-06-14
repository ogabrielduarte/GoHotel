import { ReservaController } from "../controllers/ReservaController.js";
import express from 'express';

const controller = new ReservaController();

const router = express.Router();

// ROTAS DE RESERVA
router.post('/reservas', controller.cadastrar);

router.get('/reservas/:id', controller.buscarPorId);

router.get('/usuarios/:id/reservas', controller.listarReservasUsuario);

router.put('/reservas/:id', controller.atualizar);

router.delete('/reservas/:id', controller.deletar);

// EXPORT
export default router;