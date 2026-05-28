import jwt from 'jsonwebtoken';

export function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            erro: 'Token não informado'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(
            token,
            SEGREDO_JWT
        );

        req.usuario = payload;

        next();
    } catch (e) {
        res.status(401).json({
            erro: 'Token inválido'
        });
    }
}