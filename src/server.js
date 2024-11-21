require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");

const AppError = require("./utils/AppError");

//primeiro, Importar o express dessa forma abaixo:

const cors = require("cors");
const express = require("express");
const routes = require("./routes");

migrationsRun();

//segundo, inicializar o express:

const app = express();

app.use(cors());
//usar isso para o node saber qual o padrão que vai ser recebida as informações da requisição (no caso json)
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) =>{
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});


//terceiro, definir para o express qual é a porta que será utilizada para os requerimentos:

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));

//Para testar digite no terminal: node src/server.js
//ou podemos criar um script novo no package.json escrevendo:  "start": "node ./src/server.js" 

