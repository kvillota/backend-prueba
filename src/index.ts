import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import videojuegosRoutes from './routes/videojuegos';
import authRoutes from './routes/auth';

// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

app.use('/api/videojuegos', videojuegosRoutes);

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
