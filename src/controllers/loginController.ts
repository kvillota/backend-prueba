import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db';

export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            res.status(400).json({ message: 'Usuario no encontrado' });
            return;
        }

        const usuario = result.rows[0];
        const contraseñaValida = await bcrypt.compare(password, usuario.password);
        if (!contraseñaValida) {
            res.status(400).json({ message: 'Contraseña incorrecta' });
            return;
        }

        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
