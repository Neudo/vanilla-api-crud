
const db = require('../../bootstrap/Db');
const getUsers = async () => {
    try {
        const result = await db.query('SELECT name, email FROM users');
        return result.rows;
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        throw error;
    }
};


const createUser = async (user) => {
    const { name, email, password } = user;
    const query = 'INSERT INTO users (name, email, password, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW()) RETURNING *';
    const values = [name, email, password];

    const result = await db.query(query, values);
    return result.rows[0];
};

module.exports = {
    getUsers,
    createUser
};
