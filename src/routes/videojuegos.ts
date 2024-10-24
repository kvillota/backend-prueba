import { Router } from 'express';
import { body } from 'express-validator';
import { actualizarVideojuego, crearVideojuego, eliminarVideojuego, obtenerVideojuegoPorId, obtenerVideojuegos } from '../controllers/videojuegosController';


const router = Router();

router.get('/', obtenerVideojuegos);

router.get('/:id', obtenerVideojuegoPorId);

router.post(
    '/',
    [
        body('titulo').notEmpty().withMessage('El título es obligatorio'),
        body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),
        body('stock').isInt({ gt: 0 }).withMessage('El stock debe ser un número entero positivo')
    ],
    crearVideojuego
);

router.put(
    '/:id',
    [
        body('titulo').notEmpty().withMessage('El título es obligatorio'),
        body('precio').isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),
        body('stock').isInt({ gt: 0 }).withMessage('El stock debe ser un número entero positivo')
    ],
    actualizarVideojuego
);

router.delete('/:id', eliminarVideojuego);

export default router;
