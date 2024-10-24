import { Router } from 'express';
import { loginUsuario } from '../controllers/loginController';
import { registrarUsuario } from '../controllers/registerController';
import { body } from 'express-validator';

const router = Router();

router.post('/login', loginUsuario);

router.post(
    '/register',
    [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('email').isEmail().withMessage('Debe proporcionar un email válido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    ],
    registrarUsuario
);

export default router;
