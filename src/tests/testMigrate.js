const sequelize = require('../utils/connection');
const request = require('supertest')
const app= require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const user={
            firstName:'user Test',
            lastName:'user Test',
            email:'test@gmail.com',
            password:'test1234',
            gender:'Other'
        }
      await request(app).post('/users').send(user);
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();