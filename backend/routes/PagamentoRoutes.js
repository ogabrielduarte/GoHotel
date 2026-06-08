import { PagamentoController } from "../controllers/PagamentoController.js";
import express from 'express';

const controller = new PagamentoController();

const router = express.Router();

// ROTAS DE PAGAMENTO
router.post('/pagamentos', controller.cadastrar);

router.get('/pagamentos', controller.listarTodos);

router.get('/pagamentos/:id', controller.buscarPorId);

router.put('/pagamentos/:id', controller.atualizar);

router.delete('/pagamentos/:id', controller.deletar);

// EXPORT
export default router;