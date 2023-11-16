module.exports = (req, res, next) => {
  if (req.url === "/login" && req.method === "POST") {
    let { usuarios } = require("./db.json");

    let existsUser = usuarios.find(
      (user) => req.body.email === user.email && req.body.senha === user.senha
    );

    if (existsUser !== null) {
      req.method = "GET";
      next();
    } else {
      res.sendStatus(401);
    }
  } else {
    let header = Object.getOwnPropertySymbols(req).find(
      (key) => key.description == "kHeaders"
    );

    console.log(req[header]);
    next(); // continue to JSON Server router
  }
};
