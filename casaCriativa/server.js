const express = require("express")
const server = express()

const db = require('./db')

// const ideas = [
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
//     title: "Curso de Programação",
//     category: "Estudo",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptate quasi similique suscipit, molestiae asperiores nam! Sapiente in quidem earum deleniti tempora temporibus ipsa, enim vitae sit nemo id officia.",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
//     title: "Exercícios",
//     category: "Saúde",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptate quasi similique suscipit, molestiae asperiores nam! Sapiente in quidem earum deleniti tempora temporibus ipsa, enim vitae sit nemo id officia.",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//     title: "Meditação",
//     category: "Mentalidade",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptate quasi similique suscipit, molestiae asperiores nam! Sapiente in quidem earum deleniti tempora temporibus ipsa, enim vitae sit nemo id officia.",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
//     title: "Higienização das mãos",
//     category: "Germes",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptate quasi similique suscipit, molestiae asperiores nam! Sapiente in quidem earum deleniti tempora temporibus ipsa, enim vitae sit nemo id officia.",
//     url: "https://rocketseat.com.br"
//   },
//   {
//     img: "https://www.flaticon.com/premium-icon/icons/svg/2708/2708730.svg",
//     title: "Novas ideas",
//     category: "pensamento",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptate quasi similique suscipit, molestiae asperiores nam! Sapiente in quidem earum deleniti tempora temporibus ipsa, enim vitae sit nemo id officia.",
//     url: "https://rocketseat.com.br"
//   },
//   { 
//     img: "https://www.flaticon.com/premium-icon/icons/svg/2759/2759663.svg",
//     title: "Oração",
//     category: "Religião",
//     description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptate quasi similique suscipit, molestiae asperiores nam! Sapiente in quidem earum deleniti tempora temporibus ipsa, enim vitae sit nemo id officia.",
//     url: "https://rocketseat.com.br"
//   }
// ] 

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//configuração do nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('views', {
  express: server,
  noCache: true
})

// criei uma rota
// e capturo o pedido do cliente para responder
server.get("/", (req, res) => {

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if(err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }

    const reversedIdeas = [...rows].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
      if(lastIdeas.length < 2) {
        lastIdeas.push(idea)    
      }
    }

    return res.render("index.html", { ideas: lastIdeas })

  })

})

server.get("/ideias", (req, res) => {

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if(err) {
      console.log(err)
      return res.send("Erro no banco de dados!")
    }
     
    const reversedIdeas = [...rows].reverse()

    return res.render("ideias.html", { ideas: reversedIdeas })

  })

})

// liguei meu servidor na porta 3001
server.listen(3001)


//  00:30:00