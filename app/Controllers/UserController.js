const User = require("../Models/User")

async function all(req, res) {
    try {
        const users = await User.getUsers();
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(users));
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.writeHead(500, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: 'Erreur serveur'}));
    }
}

async function user(req, res, id) {
    try {
        const user = await User.getUser(id);
        if(!user) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: 'Utilisateur non trouvé'}));
            return;
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        const cleanUser = {
            name: user.name,
            email: user.email,
            id: user.id,
            created_at: user.created_at,
            updated_at: user.updated_at
        }
        res.end(JSON.stringify(cleanUser));
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.writeHead(500, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: 'Erreur serveur'}));
    }
}

async function createUser(req, res) {
    let data = '';

    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', async () => {
        try {
            const user = await User.createUser(JSON.parse(data));
            res.writeHead(200, {"Content-Type": "application/json"});
            const cleanUser = {
                name: user.name,
                email: user.email,
                id: user.id
            }
            res.end(JSON.stringify(cleanUser));
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur :', error);
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: 'Erreur serveur'}));
        }
    });
}

async function updateUser(req, res, id) {
    let data = '';

    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', async () => {
        try {
            const user = await User.updateUser(id, JSON.parse(data));
            if(!user) {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({error: 'Utilisateur non trouvé'}));
                return;
            }
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(user));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
            res.writeHead(500, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: 'Erreur serveur'}));
        }
    });
}

async function deleteUser(req, res, id) {
    try {
        const user = await User.deleteUser(id);
        if(!user) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({error: 'Utilisateur non trouvé'}));
            return;
        }
        res.writeHead(204, {"Content-Type": "application/json"});
        res.end();
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        res.writeHead(500, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: 'Erreur serveur'}));
    }
}

module.exports = {
    all,
    user,
    createUser,
    updateUser,
    deleteUser
}