const express = require("express");
const cors = require("cors");
const {uuid}  = require("uuidv4");

//const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/", (request, response) => {
  console.log('teste');

});

app.get("/repositories", (request, response) => {
 
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { id, title, url, tech, likes } = request.body;

  const repository =
    { 
      id: "uuid",
      title: 'Desafio Node.js',
      url: 'https://github.com/Piscinao/Challenge-GoStack-RocketSeat-Bootcamp01',
      tech: ["Node.js", "..."],
      likes: 0
    };


    repositories.push(repository);

  return response.json(repository);
  
});


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, tech, likes } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex < 0)
  {
    return response.status(400).json({ error: 'Repository not found'})
  }

  const repository = {
    id,
    title,
    url,
    tech

  };


  repositories[repositoryIndex] = repository;

  return response.json(repository);


});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0)
  {
    return response.status(400).json({ error: 'Repository not found'})
  }


  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();

});



app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex < 0)
  {
    return response.status(400).json({ error: 'Repository not found'})
  }

  repositories[repositoryIndex].likes++;
  return response.json(repositoryIndex);

});

module.exports = app;
