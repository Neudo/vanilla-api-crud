const db = require('../bootstrap/Db');

class UserRepository {
    async all() {
        try {
            const result = await db.query('SELECT * FROM users');
            return result.rows;
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            throw error;
        }
    }

    async create(user) {
        const { name, email, password } = user;
        try {
            const result = await db.query('INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *', [name, email, password]);
            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            throw error;
        }
    }

    async update(id, user) {
        const { name, email, password } = user;
        try {
            const result = await db.query('UPDATE users SET name = $1, email = $2, password = $3, updated_at = NOW() WHERE id = $4 RETURNING *', [name, email, password, id]);
            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            throw error;
        }
    }
}

module.exports = new UserRepository();
