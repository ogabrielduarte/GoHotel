import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// ROTAS
import usuarioRoutes from './routes/UsuarioRoutes.js';
import hotelRoutes from './routes/HotelRoutes.js';
import reservaRoutes from './routes/ReservaRoutes.js';

dotenv.config();

const app = express();

// app.use()
app.use(express.json());

app.use(cors()); // provavelmente será trocado por uma configuração mais específica de CORS, na 3001 ou 4000, para o frontend. por ora, deixamos aberto para facilitar os testes.

app.use(express.urlencoded({ extended: true }));

// app.use() rotas
app.use(usuarioRoutes);
app.use(hotelRoutes);
app.use(reservaRoutes);

export default app;