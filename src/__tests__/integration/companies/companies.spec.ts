import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source'
import request from 'supertest'
import app from '../../../app'
import { mockedAdmin, mockedAdminLogin, mockedCompany, mockedCompany2, mockedCompany3, mockedUser, mockedUserLogin } from '../../mocks';

describe('/companies', () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize()
        .then((res) => (connection = res))
        .catch((err) => console.error(err))
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test('POST /companies - Must be able to create a company', async () => {
        await request(app).post('/users').send(mockedAdmin)
        const adminLogin = await request(app).post('/session').send(mockedAdminLogin)
        const response = await request(app).post('/companies').set('Authorization', `Bearer ${adminLogin.body.token}`).send(mockedCompany)
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('companyName')
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('user')
    })

    test('POST /companies - Should not be able to create a company that already exists', async () => {
        await request(app).post('/users').send(mockedAdmin)
        const adminLogin = await request(app).post('/session').send(mockedAdminLogin)
        const response = await request(app).post('/companies').set('Authorization', `Bearer ${adminLogin.body.token}`).send(mockedCompany)
        
        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty('message')
    })

    test('POST /companies - Should not be able to create a company without authentication', async () => {
        const response = await request(app).post('/companies')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    test('POST /companies - Only Admin should be able to create a company', async () => {
        await request(app).post('/users').send(mockedUser)
        const userLogin = await request(app).post('/session').send(mockedUserLogin)
        const response = await request(app).post('/companies').set('Authorization', `Bearer ${userLogin.body.token}`).send(mockedCompany)
    
        expect(response.status).toBe(403)
        expect(response.body).toHaveProperty('message')
    })  

    test('GET /companies - Should be able to list all companies', async () => {
        await request(app).post('/users').send(mockedAdmin)
        const adminLogin = await request(app).post('/session').send(mockedAdminLogin)
        await request(app).post('/companies').set('Authorization', `Bearer ${adminLogin.body.token}`).send(mockedCompany2)
        await request(app).post('/companies').set('Authorization', `Bearer ${adminLogin.body.token}`).send(mockedCompany3)
        const response = await request(app).get('/companies')

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(3)
    })

    test('PATCH /companies/:id - Should be able to update a company', async () => {
        const newCompanyName = {companyName: 'Kenzinho Mudanças'}

        const admingLoginResponse = await request(app).post('/session').send(mockedAdminLogin)
        const company = await request(app).get('/companies')
        const response = await request(app).patch(`/companies/${company.body[0].id}`).set('Authorization', `Bearer ${admingLoginResponse.body.token}`).send(newCompanyName)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('companyName')
    })
})