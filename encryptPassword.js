const bcrypt = require('bcryptjs');

(async () => {
    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        console.log(`Contraseña encriptada: ${hashedPassword}`);
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
    }
})();
