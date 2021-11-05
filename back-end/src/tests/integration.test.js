const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const server = require('../api/app');

chai.use(chaiHttp);

const { expect } = chai;

const userLogin = { email: 'jane@emmail.com', password: 'senha123'};
const adminLogin = { email: 'admin@teste.com', password: '123' };
const wrongLogin = { email: 'wrong@emmail.com', password: 'wrong' };
const newRecipe = { name: 'recipe', ingredients: 'recipe', preparation: 'prepare' };
const usersDb = [
  {_id: '565de6ded1ff223100cd6aa2',name: 'admin', email: 'admin@teste.com', password: '123', role: 'admin'},
  {_id: '565de6ded1ff223100cd6aa5',name: 'user', email: 'user@teste.com', password: '123', role: 'user'},
];

let response = {};
let recipeId;

const DBServer = new MongoMemoryServer();

before(async () => {
  const URLMock = await DBServer.getUri();
    const connectionMock = await MongoClient.connect(URLMock,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

  sinon.stub(MongoClient, 'connect')
      .resolves(connectionMock);

  await connectionMock.db('Cookmaster').collection('users').insertMany(usersDb);
});

after(async () => {
  MongoClient.connect.restore();
  // await DBServer.stop();
});

// describe('GET /', () => {
  
//   describe('Testa página para o avaliador', () => {

//     before(async () => {
//       response = await chai.request(server)
//           .get('/');
//     });

//     it('retorna um objeto', () => {
//       expect(response.body).to.be.an('object');
//     });
//   });
// });

describe('POST /users', () => {

  describe('quando é criado com sucesso', () => {
    before(async () => {
      response = await chai.request(server)
          .post('/users')
          .send({
            name: 'jane',
            email: 'jane@emmail.com',
            password: 'senha123'
          });
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna um objeto com as propriedades esperadas', () => {
      expect(response.body.user).to.have.all.keys('name', 'email', 'role', '_id');
    });
  });

  describe('quando a tentativa é sem sucesso devido a informações inválidas', () => {
    before(async () => {
      response = await chai.request(server)
          .post('/users')
          .send({
            name: 'jane',
            password: 'senha123'
          });
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna um objeto com as propriedades esperadas', () => {
      expect(response.body).to.have.all.keys('message');
    });

    it('retorna a mensagem: "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });

  describe('quando a tentativa é sem sucesso devido ao e-mail já estar em uso', () => {
    before(async () => {
      response = await chai.request(server)
          .post('/users')
          .send({
            name: 'outra jane',
            email: 'jane@emmail.com',
            password: 'senha123'
          });
    });

    it('retorna o código de status 409', () => {
      expect(response).to.have.status(409);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna um objeto com as propriedades esperadas', () => {
      expect(response.body).to.have.all.keys('message');
    });

    it('retorna a mensagem: "Email already registered"', () => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
});

describe('POST /users/admin', () => {

  describe('quando é criado com sucesso', () => {

    before(async () => {
      const { body: { token } } = await chai.request(server)
          .post('/login')
          .send(adminLogin);
      
      response = await chai.request(server)
          .post('/users/admin')
          .send({ name: 'admin2', email: 'admin2@teste.com', password: '123' })
          .set({
            'authorization': token,
          });
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna um objeto com as propriedades esperadas', () => {
      expect(response.body.user).to.have.all.keys('name', 'email', 'role', '_id');
    });
  });

  describe('quando a tentativa é sem sucesso devido ao cadastrante não ser um admin', () => {

    before(async () => {
      const { body: { token } } = await chai.request(server)
          .post('/login')
          .send(userLogin);
      
      response = await chai.request(server)
          .post('/users/admin')
          .send({ name: 'admin3', email: 'admin3@teste.com', password: '123' })
          .set({
            'authorization': token,
          });
    });

    it('retorna o código de status 403', () => {
      expect(response).to.have.status(403);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna a mensagem "quando a tentativa é sem sucesso devido ao cadastrante não ser um admin"', () => {
      expect(response.body.message).to.be.equal('Only admins can register new admins');
    });
  });
});

describe('POST /login', () => {

  describe('Quando realiza login com sucesso', () => {
    before(async () => {
      response = await chai.request(server)
          .post('/login')
          .send(userLogin);
    });

    it('retorna um token', () => {
      expect(response.body).to.have.key('token');
    });
  });

  describe('Quando realiza login sem sucesso', () => {
    before(async () => {
      response = await chai.request(server)
          .post('/login')
          .send(wrongLogin);
    });

    it('retorna uma mensagem', () => {
      expect(response.body).to.have.key('message');
    });

    it('retorna uma mensagem com o texto: "Incorrect username or password"', () => {
      expect(response.body.message).to.be.equal('Incorrect username or password');
    });
  });
});

describe('POST /recipes', () => {

  describe('Ao criar uma receita com sucesso', () => {
    before(async () => {
      const { body: { token } } = await chai.request(server)
          .post('/login')
          .send(userLogin);

      response = await chai.request(server)
          .post('/recipes')
          .send(newRecipe)
          .set({
            'authorization': token,
          });

          recipeId = (response.body.recipe._id);
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('retorna um objeto com as propriedades esperadas', () => {
      expect(response.body.recipe).to.have.all.keys('name', 'ingredients', 'preparation', 'userId', 'image', '_id');
    });
  });

  describe('Ao criar uma receita sem token', () => {
    before(async () => {
      response = await chai.request(server)
          .post('/recipes')
          .send(newRecipe);
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna a mensagem: "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('Ao criar uma receita sem todas as informações', () => {
    before(async () => {
      const { body: { token } } = await chai.request(server)
          .post('/login')
          .send(userLogin);

      response = await chai.request(server)
          .post('/recipes')
          .send({ name: 'recipe'})
          .set({
            'authorization': token,
          });
    });

    it('retorna o código de status 400', () => {
      expect(response).to.have.status(400);
    });

    it('retorna a mensagem: "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});

describe('GET /recipes', () => {
  
  describe('Ao buscar todas as receitas', () => {

    before(async () => {
      response = await chai.request(server)
          .get('/recipes');
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array', () => {
      expect(response.body).to.be.an('array');
    });
  });
});

describe('GET /recipes/:id', () => {
  
  describe('Ao buscar uma receita que existe', () => {
    
    before(async () => {
      response = await chai.request(server)
          .get(`/recipes/${recipeId}`);
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });
  });

  describe('Ao buscar uma receita que não existe', () => {
    
    before(async () => {
      response = await chai.request(server)
          .get(`/recipes/565de6ded1ff223100cd6aa3`);
    });

    it('retorna o código de status 404', () => {
      expect(response).to.have.status(404);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });
  });
});

describe('PUT /recipes/:id', () => {
  
  describe('Ao editar uma receita com sucesso', () => {
    before(async () => {
      const { body: { token } } = await chai.request(server)
          .post('/login')
          .send(userLogin);
      
      response = await chai.request(server)
          .put(`/recipes/${recipeId}`)
          .send({ name: 'New Name' })
          .set({
            'authorization': token,
          });
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna o objeto contendo a receita com o novo nome', () => {
      expect(response.body.name).to.be.equal('New Name');
    });
  });

  describe('Ao tentar editar uma receita sem ser o criador', () => {
    before(async () => {
      const { body: { token } } = await chai.request(server)
          .post('/login')
          .send({
            email: 'user@teste.com',
            password: '123'
          });
      
      response = await chai.request(server)
          .put(`/recipes/${recipeId}`)
          .send({ name: 'New Name By Jane' })
          .set({
            'authorization': token,
          });
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna o objeto contendo a mensagem: "only the creator has permission to edit"', () => {
      expect(response.body.message).to.be.equal('only the creator has permission to edit');
    });
  });
});

describe('DELETE /recipes/:id', () => {

  describe('Ao tentar deletar uma receita sem ser o criador', () => {
    before(async () => {
      const { body: { token } } = await chai.request(server)
          .post('/login')
          .send({
            email: 'user@teste.com',
            password: '123'
          });
      
      response = await chai.request(server)
          .delete(`/recipes/${recipeId}`)
          .set({
            'authorization': token,
          });
    });

    it('retorna o código de status 401', () => {
      expect(response).to.have.status(401);
    });

    it('retorna o objeto contendo a mensagem: "only the creator has permission to delete"', () => {
      expect(response.body.message).to.be.equal('only the creator has permission to delete');
    });
  });

  describe('Ao deletar uma receita com sucesso', () => {
    before(async () => {
      const { body: { token } } = await chai.request(server)
          .post('/login')
          .send(userLogin);
      
      response = await chai.request(server)
          .delete(`/recipes/${recipeId}`)
          .set({
            'authorization': token,
          });
    });

    it('retorna o código de status 204', () => {
      expect(response).to.have.status(204);
    });

    it('retorna o objeto', () => {
      expect(response.body).to.be.an('object');
    });
  });
});
