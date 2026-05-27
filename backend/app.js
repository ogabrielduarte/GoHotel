import express from 'express';

// IMPORTAÇÃO DAS ROTAS
import usuarioRoutes from './routes/UsuarioRoutes.js';
import hotelRoutes from './routes/HotelRoutes.js';
import telefoneRoutes from './routes/TelefonesRoutes.js';
import reservaRoutes from './routes/ReservaRoutes.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

// app.use()
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.use() para rotas
app.use(usuarioRoutes);

app.use(hotelRoutes);

app.use(telefoneRoutes);

app.use(reservaRoutes);

export default app;
