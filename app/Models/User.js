
const db = require('../../bootstrap/Db');
const getUsers = async () => {
    try {
        const result = await db.query('SELECT name, email, id FROM users');
        return result.rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        throw error;
    }
};

const getUser = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        throw error;
    }
}


const createUser = async (user) => {
    const { name, email, password } = user;
    const query = 'INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *';
    const values = [name, email, password];

    const result = await db.query(query, values);
    return result.rows[0];
};

const updateUser = async (id, user) => {
    const { name, email, password } = user;
    const query = 'UPDATE users SET name = $1, email = $2, password = $3, updated_at = NOW() WHERE id = $4 RETURNING *';
    const values = [name, email, password, id];

    const result = await db.query(query, values);
    return result.rows[0];
};

const deleteUser = async (id) => {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];

    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
