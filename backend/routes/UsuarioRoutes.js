import { Router } from 'express';

import { UsuarioController } from '../controllers/UsuarioController.js';

import autenticar from '../middlewares/auth.js';

import upload from "../config/multer.js";

const router = Router();

const controller = new UsuarioController();


// ROTAS PÚBLICAS

router.post('/usuarios', controller.cadastrar);

router.post('/login', controller.login);


// ROTAS PROTEGIDAS

router.get(
    '/usuarios',
    autenticar,
    controller.listarTodos
);

router.get(
    '/usuarios/:id',
    autenticar,
    controller.buscarPorId
);

router.get (
    '/usuarios/reservas/:id',
    autenticar,
    controller.listarReservasUsuario
)

router.put(
    '/usuarios/:id',
    autenticar,
    controller.atualizar
);

router.patch(
    "/usuarios/:id/foto",
    upload.single("foto"),
    controller.atualizarFoto
);

router.delete(
    '/usuarios/:id',
    autenticar,
    controller.deletar
);

export default router;