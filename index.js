const http = require("http")
const fs = require("fs")
const db = require("./bootstrap/Db")
const User = require("./app/Models/User")


const server = http.createServer(async (request, response) => {
    let url = request.url
    let method = request.method

    if (url === "/") {
        response.writeHead(200, {"Content-Type": "application/json"})
        response.end(JSON.stringify({url }))
    } else if (url === "/users" && method === "GET") {
        try {
            const users = await User.getUsers();
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify(users));
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs :', error);
            response.writeHead(500, {"Content-Type": "application/json"});
            response.end(JSON.stringify({error: 'Erreur serveur'}));
        }

    }  else if (url === "/users" && method === "POST") {
        let data = '';

        request.on('data', (chunk) => {
            data += chunk;
        });

        request.on('end', async () => {
            console.log(data);
            try {
                const user = await User.createUser(JSON.parse(data));
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify(user));
            } catch (error) {
                console.error('Erreur lors de la création de l\'utilisateur :', error);
                response.writeHead(500, {"Content-Type": "application/json"});
                response.end(JSON.stringify({error: 'Erreur serveur'}));
            }
        });
    }


    else {
        response.writeHead(404, {"Content-Type": "application/json"})
        response.end(JSON.stringify({error: 404}))
    }

})

const PORT =  process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

