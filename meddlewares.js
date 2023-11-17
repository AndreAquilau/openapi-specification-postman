module.exports = (req, res, next) => {
  if (req.url === "/login" && req.method === "POST") {
    let { usuarios } = require("./db.json");

    let existsUser = usuarios.find(
      (user) => req.body.email === user.email && req.body.senha === user.senha
    );

    console.log(existsUser);

    if (existsUser) {
      req.method = "GET";
      next();
    } else {
      res.status(400).jsonp({
        error: "Usuário ou senha incorreto!",
      });
    }
  } else {
    let header = Object.getOwnPropertySymbols(req).find(
      (key) => key.description == "kHeaders"
    );

    let { login } = require("./db.json");
    let token = req[header]["authorization"];

    console.log(token);
    console.log(login.token);

    // Descomente esse código para gerar o mock de autorização
    /*
    res.status(403).jsonp({
      error: "Usuário sem permissão admin!",
    });
    */

    if (token === "Bearer ".concat(login.token)) {
      next(); // continue to JSON Server router
    } else {
      res.status(401).jsonp({
        error: "Usuário não autenticado!",
      });
    }
  }
};
