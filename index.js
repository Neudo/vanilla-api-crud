const http = require("http")
const {all, user, createUser, deleteUser, updateUser} = require("./app/Controllers/UserController")



const server = http.createServer(async (req, res) => {
    let url = req.url
    let method = req.method

    if (url === "/") {
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({url }))
    } else if (url === "/users" && method === "GET") {
        all(req, res)
    }  else if (url === "/users" && method === "POST") {
     createUser(req, res)
    } else if (url.match(/\/users\/([0-9]+)/) && method === "GET") {
        const id = url.split("/")[2]
        user(req, res, id)
    } else if (url.match(/\/users\/([0-9]+)/) && method === "PUT") {
        const id = url.split("/")[2]
        updateUser(req, res, id)
    } else if (url.match(/\/users\/([0-9]+)/) && method === "DELETE") {
        const id = url.split("/")[2]
        deleteUser(req, res, id)
    }
    else {
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(JSON.stringify({error: 404}))
    }

})

const PORT =  process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

