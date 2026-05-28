import { UsuarioController } from "../controllers/UsuarioController.js";
import express from 'express';

const controller = new UsuarioController();

const router = express.Router();

// ROTAS DE USUÁRIO
router.post('/usuarios', controller.cadastrar);

router.post('/usuarios', controller.login);

router.get('/usuarios/:id', controller.buscar);

router.put('/usuarios/:id', controller.atualizar);

router.delete('/usuarios/:id', controller.deletar);

// EXPORT
export default router;
