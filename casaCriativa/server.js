const express = require("express")
const server = express()

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

// criei uma rota
// e capturo o pedido do cliente para responder
server.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html")
})

server.get("/ideias", (req, res) => {
  return res.sendFile(__dirname + "/public/ideias.html")
})

// liguei meu servidor na porta 3001
server.listen(3001)
