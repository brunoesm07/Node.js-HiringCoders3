// Incluindo uma biblioteca
const http = require('http');
const queryString = require('query-string');
const url = require('url');
const fs = require('fs');

// Definindo IP e porta
const hostname = '127.0.0.1';
const port = 3000;

// Implementacao da regra de negocio
const server = http.createServer((req, res) => {

let resposta;
const urlparse = url.parse(req.url, true);
 // Receber informacoes do usuario
 const params = queryString.parse(urlparse.search);

// Criar usuario - Atualizar usuario
if(urlparse.pathname == '/criar-atualizar-usuario'){

 // Salvar as informacoes
fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
 if (err) throw err;
 console.log('Saved!');
 
 resposta = 'Usuario criado / atualizado com sucesso';

 res.statusCode = 200;
 res.setHeader('Content-Type', 'application/json');
 res.end(resposta);
 });

}
// Buscar usuario
else if(urlparse.pathname == '/selecionar-usuario'){
  fs.readFile('users/' + params.id + '.txt', function(err, data) {
    resposta = data;
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(resposta);
  });
}

// Remover usuario 
else if(urlparse.pathname == '/remover-usuario'){
  fs.unlink('users/' + params.id + '.txt', function (err) {
    console.log('File deleted!');
    
    resposta = err ? "Usuario nao encontrado" : "Usuario removido";

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(resposta);
  });
  }
}); 

  // Execucao
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});