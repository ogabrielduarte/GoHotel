import express from 'express';

// ROTAS
import usuarioRoutes from './routes/UsuarioRoutes.js';
import hotelRoutes from './routes/HotelRoutes.js';
import telefoneRoutes from './routes/TelefonesRoutes.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

// app.use()
app.use(express.json());

app.use(usuarioRoutes);

app.use(hotelRoutes);

app.use(telefoneRoutes);

export default app;
