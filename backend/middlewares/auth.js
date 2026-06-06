import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function autenticar(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            erro: 'Token não informado'
        });
    }

    const token = authHeader.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    
    try {
        const payload = jwt.verify(
            token,
            JWT_SECRET
        );

        req.usuario = payload;

        next();
    } catch (e) {
        res.status(401).json({
            erro: 'Token inválido'
        });
    }
}

export default autenticar;