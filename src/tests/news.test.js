const request =require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async()=>{
    const res=await request(app).post('/users/login').send({
        email:'test@gmail.com',
        password:'test1234',
    });
    token=res.body.token;
    console.log(res.body)

});

test('GET /news', async () => {
    const res= await request(app).get('/news');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /news', async () => {
    const body ={
        headline:'test',
        lead: 'test',
        author: 'test',
        imageDescription: 'test',
        date: '1990-01-01',
        body: 'test body'
    }
    const res = await request(app).post('/news')
        .send(body)
        .set('Authorization',`Bearer ${token}`);
    id=res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.headline).toBe(body.headline);
    
});

test('DELETE /news:id', async()=>{
    const res = await request(app)
        .delete(`/news/${id}`)
        .set('Authorization', `Bearer ${token}`)

    expect(res.status).toBe(204);
})