import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import pool from '../config/db';

export const obtenerVideojuegos = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await pool.query('SELECT * FROM videojuegos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los videojuegos' });
    }
};

export const obtenerVideojuegoPorId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM videojuegos WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Videojuego no encontrado' });
            return;
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el videojuego' });
    }
};

export const crearVideojuego = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { titulo, descripcion, precio, stock, fecha_lanzamiento, plataforma } = req.body;

    try {
        // Verificar si ya existe un videojuego con el mismo título
        const videojuegoExistente = await pool.query('SELECT * FROM videojuegos WHERE titulo = $1', [titulo]);
        if (videojuegoExistente.rows.length > 0) {
            res.status(400).json({ message: 'El título del videojuego ya existe' });
            return;
        }

        // Si no existe, insertar el nuevo videojuego
        const result = await pool.query(
            'INSERT INTO videojuegos (titulo, descripcion, precio, stock, fecha_lanzamiento, plataforma) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [titulo, descripcion, precio, stock, fecha_lanzamiento, plataforma]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el videojuego' });
    }
};


export const actualizarVideojuego = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { id } = req.params;
    const { titulo, descripcion, precio, stock, fecha_lanzamiento, plataforma } = req.body;

    try {
        const result = await pool.query(
            'UPDATE videojuegos SET titulo = $1, descripcion = $2, precio = $3, stock = $4, fecha_lanzamiento = $5, plataforma = $6, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *',
            [titulo, descripcion, precio, stock, fecha_lanzamiento, plataforma, id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Videojuego no encontrado' });
            return;
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el videojuego' });
    }
};

export const eliminarVideojuego = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM videojuegos WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Videojuego no encontrado' });
            return;
        }

        res.status(200).json({ message: `Videojuego con id ${id} eliminado correctamente` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el videojuego' });
    }
};
