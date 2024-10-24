import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db';

export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { nombre, email, password } = req.body;

    try {
        const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (usuarioExistente.rows.length > 0) {
            res.status(400).json({ message: 'El email ya está registrado' });
            return;
        }

        // Encriptar la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query('INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)', [nombre, email, hashedPassword]);

        res.json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
