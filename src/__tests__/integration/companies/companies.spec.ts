import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source'
import request from 'supertest'
import app from '../../../app'
import { mockedCompany, mockedUser } from '../../mocks';
import { response } from 'express';

describe('/companies', () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error(err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test('POST /companies - Must be able to create a company', async () => {
        const admin = await request(app).post('/session')
        const response = await request(app).post('/companies').set('Authorization', `Bearer ${admin.body.token}`).send(mockedCompany)
        
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('companyName')
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('user')
    })

    test('POST /companies - Should not be able to create a company that already exists', async () => {
        const response = await request(app).post('/companies').send(mockedCompany)
        
        expect(response.status).toBe(409)
        expect(response.body).toHaveProperty('message')
    })

})