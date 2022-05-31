// Incluindo uma biblioteca
const http = require('http');
const url = require('url');
const queryString = require('query-string');

// Definindo IP e porta
const hostname = '127.0.0.1';
const port = 3000;

// Implementacao da regra de negocio
const server = http.createServer((req, res) => {

  // Pegar a pergunta na url
const params = queryString.parse(url.parse(req.url, true).search);


  // Verificar a pergunta e escolher uma resposta
let resposta;
if(params.pergunta == 'melhorFilme'){
  resposta = 'Top Gun';
}
else if(params.pergunta == 'melhor-tecnologia-backend'){
  resposta = 'node.js';
}
else {
  resposta = 'nao sei, desculpe';
}

  // Retornar a resposta escolhida

res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
res.end(resposta);
});

// Execucao
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});