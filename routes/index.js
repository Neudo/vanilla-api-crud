const { all, user, createUser, deleteUser, updateUser } = require("../app/Controllers/UserController");
const extractParams = (url, route) => {
    const routeParts = route.split("/");
    const urlParts = url.split("/");

    if (routeParts.length !== urlParts.length) {
        return null;
    }

    const params = {};
    for (let i = 0; i < routeParts.length; i++) {
        const routePart = routeParts[i];
        const urlPart = urlParts[i];

        if (routePart.startsWith(":")) {
            const paramName = routePart.slice(1);
            params[paramName] = urlPart;
        } else if (routePart !== urlPart) {
            return null;
        }
    }

    return params;
};

const findMatchingRoute = (url) => {
    for (const route in routes) {
        const params = extractParams(url, route);
        if (params !== null) {
            return routes[route];
        }
    }
    return null;
};


const routes = {
    "/": {
        GET: (req, res) => {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({url: "/"}));
        },
    },
    "/users": {
        GET: all,
        POST: createUser,
    },
    "/users/:id": {
        GET: (req, res) => {
            const { id } = extractParams(req.url, "/users/:id");
            if (id !== null) {
                user(req, res, id);
            } else {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({error: "Invalid URL for user resource"}));
            }
        },
        PUT: (req, res) => {
            const { id } = extractParams(req.url, "/users/:id");
            if (id !== null) {
                updateUser(req, res, id);
            } else {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({error: "Invalid URL for user resource"}));
            }
        },
        DELETE: (req, res) => {
            const { id } = extractParams(req.url, "/users/:id");
            if (id !== null) {
                deleteUser(req, res, id);
            } else {
                res.writeHead(404, {"Content-Type": "application/json"});
                res.end(JSON.stringify({error: "Invalid URL for user resource"}));
            }
        },
    },
};

const router = (req, res) => {
    const { url, method } = req;
    const matchingRoute = findMatchingRoute(url);

    if (matchingRoute && matchingRoute[method]) {
        matchingRoute[method](req, res);
    } else {
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: 404}));
    }
};



module.exports = router;