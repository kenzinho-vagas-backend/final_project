import { DataSource } from 'typeorm'
import AppDataSource from '../../../data-source'
import request from 'supertest'
import app from '../../../app'
import {mockedAdmin, mockedAdminLogin, mockedCompany, mockedJob, mockedJob2, mockedJob3, mockedJobUser, mockedJobUserInvalid, mockedUser, mockedUser2, mockedUserLogin, mockedUserLogin2} from '../../mocks'

describe('/jobUser', () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error('Error during Data Source initialization', err)
        })

        await request(app).post('/users').send(mockedUser)
        await request(app).post('/users').send(mockedAdmin)
        await request(app).post("/session").send(mockedAdminLogin);
        await request(app).post("/session").send(mockedUserLogin);
       
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test('POST /jobUser -  Must be able to save a job',async () => {
        await request(app).post('/users').send(mockedUser2)
        const user = await request(app).post('/session').send(mockedUserLogin2)
        
        const admin = await request(app).post('/session').send(mockedAdminLogin)

        const company = await request(app).post('/companies').send(mockedCompany).set('Authorization', `Bearer ${admin.body.token}`)
        
        const newJob = {...mockedJob, companies: company.body.id}
        
        await request(app).post('/jobs').send(newJob).set('Authorization', `Bearer ${admin.body.token}`)

       
        const jobs = await request(app).get('/jobs')

        
        const response = await request(app).post('/jobUser').set('Authorization', `Bearer ${user.body.token}`).send(jobs.body[0].id)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('job')
        expect(response.body).toHaveProperty('id')
    })

    test('POST /jobUser - Should not be able to save a job that already saved', async () => {
        await request(app).post('/users').send(mockedUser2)
        const user = await request(app).post('/session').send(mockedUserLogin2)

        const savedJob = await request(app).post('/jobUser').set('Authorization', `Bearer ${user.body.token}`)
        
        const response = await request(app).post('/jobUser').set('Authorization', `Bearer ${user.body.token}`).send(savedJob.body.id)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(409)   
    })

    test('POST /jobUser - Should not be able to saved Job without auth token', async () => {
        const jobs = await request(app).get('/jobs')
        const response = await request(app).post('/jobUser')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })


    test('GET /jobUser -  Must be able to list all jobs saved', async () => {
        await request(app).post('/users').send(mockedUser2)
        const user = await request(app).post('/session').send(mockedUserLogin2)

          
       const response = await request(app).get('/jobUser').set('Authorization', `Bearer ${user.body.token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(1)

    })

    test('GET /jobUser - Should not be able to list all jobs saved without auth token', async () => {
        const response = await request(app).post('/jobUser')

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })

    test('DELETE /jobUser - Should not be able to delete a saved job with an invalid id', async() => {
        const userLoginResponse = await request(app).post('/session').send(mockedUserLogin)
        
        const response = await request(app).delete(`/jobUser/${mockedJobUserInvalid}`).set('Authorization', `Bearer ${userLoginResponse.body.token}`)
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    })

    test('DELETE /jobUser - Should not be able to delete a saved job without auth token', async() => {
        const user = await request(app).post('/session').send(mockedUserLogin2)
        
        const job = await request(app).get('/jobUser').set('Authorization', `Bearer ${user.body.token}`)
        
        const response = await request(app).delete(`/jobUser/${job.body[0].id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty('message')
    })


    test('DELETE /jobUser -  should be able to delete a job saved.',async () => { 
        const user = await request(app).post('/session').send(mockedUserLogin2)
        
        const job = await request(app).get('/jobUser').set('Authorization', `Bearer ${user.body.token}`)

        const response = await request(app).delete(`/jobUser/${job.body[0].id}`).set('Authorization', `Bearer ${user.body.token}`)

        expect(response.status).toBe(204)
    })
})


