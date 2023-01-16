import { DataSource } from 'typeorm'
import AppDataSource from '../../../data-source'
import request from 'supertest'
import app from '../../../app'
import {mockedAdmin, mockedAdminLogin, mockedJob, mockedJob2, mockedJob3, mockedJobUser, mockedUser, mockedUserLogin} from '../../mocks'

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
        const adminLoginResponse = await request(app).post("/session").send(mockedAdminLogin);
        const userResponse = await request(app).post("/session").send(mockedUserLogin);
        const jobs = await request(app).post('/jobs').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedAdmin)
        mockedJob2.jobId = jobs.body.id
        mockedJob3.jobId = jobs.body.id
        await request(app).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedJob2)
        await request(app).post('/properties').set("Authorization", `Bearer ${adminLoginResponse.body.token}`).send(mockedJob3)
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test('POST /jobUser -  Must be able to save a job',async () => {
        const jobs = await request(app).get('/jobs')
        await request(app).post('/users').send(mockedAdmin)
        const user = await request(app).post('/session').send(mockedUserLogin)
        const admin = await request(app).post('/session').send(mockedAdminLogin)
        mockedJobUser.jobId = jobs.body[0].id
        const response = await request(app).post('/jobUser').set('Authorization', `Bearer ${user.body.token}`).send(mockedJobUser)
        await request(app).post('/jobs').set("Authorization", `Bearer ${admin.body.token}`).send(mockedJob2)
        expect(response.body).toHaveProperty('id')
        expect(response.status).toBe(201)
    })

    test('POST /jobUser - Should not be able to save a job that already saved', async () => {
        const jobs = await request(app).get('/jobs')
        const user = await request(app).post('/session').send(mockedUserLogin)
        mockedJobUser.jobId = jobs.body[0].id
        const response = await request(app).post('/jobUser').set('Authorization', `Bearer ${user.body.token}`).send(mockedJobUser)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(409)   
    })


    test('GET /jobUser -  Must be able to list all jobs saved', async () => {
        await request(app).post('/users').send(mockedUser)
        const user = await request(app).post('/session').send(mockedUserLogin)
        const response = await request(app).get('/jobUsers').set('Authorization', `Bearer ${user.body.token}`)

    })


    test('DELETE /jobUser -  should be able to delete a job saved.',async () => { 
        const user = await request(app).post('/session').send(mockedUserLogin)
        const job = await request(app).get('/jobUser')
        const response = await request(app).delete(`/jobUser/${job.body[0].id}`).set('Authorization', `Bearer ${user.body.token}`)
        const jobUser = await request(app).get('/jobUser')

        expect(response.status).toBe(204)
    })
})


