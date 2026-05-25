import { HotelController } from "../controllers/HotelController.js";
import express from 'express';

const controller = new HotelController();

const router = express.Router();

// ROTAS DE USUÁRIO
router.post('/hoteis', controller.cadastrar);

router.get('/hoteis/:id', controller.buscar);

router.put('/hoteis/:id', controller.atualizar);

router.delete('/hoteis/:id', controller.deletar);

// EXPORT
export default router;