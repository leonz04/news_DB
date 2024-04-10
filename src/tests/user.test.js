const request =require('supertest');
const app = require('../app');

let id;
let token;


test ("POST /users should be create a user and return status 201",async()=>{
    const body={
        firstName:"user firstName",
        lastName: "user lastName",
        email:"email@email.com",
        password:"1324",
        gender:"Other"
    }
    
    const res= await request(app).post('/users').send(body);
    id=res.body.id;
    
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});




test("POST /users/login should be return a user and token",async()=>{
    const body={
        email:"email@email.com",
        password:"1324"
    }
    const res= await request(app).post("/users/login").send(body);
    token=res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email)
})



test('POST /users/login with incorrect credencials  should be return error 401', async() => {
    const body={
        email:"incorrect@email.com",
        password:"incorrect password"
    }
    const res = await request(app).post('/users/login').send(body);
    expect(res.status).toBe(401);


  })
  test("GET /users should be return status 200", async()=>{    
    const res = await request(app)
    .get('/users')
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test("GET ONE /users/:id should be return status 200",async()=>{
    const res = await request(app)
    .get(`/users/${id}`)
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBeDefined();
    
});


  test("PUT /users/:id should be update a user and return status 200", async()=>{
    const body={
        firstName:"user update",
    }
    const res= await request(app)
    .put(`/users/${id}`)
    .send(body)
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /users/:id should be delete a user an return status 204", async()=>{
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(204)
});

