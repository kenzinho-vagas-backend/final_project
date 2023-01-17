import { DataSource } from 'typeorm'
import AppDataSource from '../../../data-source'
import request from 'supertest'
import app from '../../../app'
import {mockedJob, mockedAdmin, mockedAdminLogin, mockedCompany, mockedUser, mockedUserLogin, mockedJobInvalidCompanyId, mockedTechnology,mockedJobPatch, mockedAdmin2, mockedAdminLogin2} from '../../mocks'

describe('/jobs', () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error('Error during Data Source initialization', err)
        })
        await request(app).post('/users').send(mockedAdmin)
        await request(app).post('/users').send(mockedUser)
        const adminToken = await request(app).post('/session').send(mockedAdminLogin)
        await request(app).post('/companies').set('Authorization', `Bearer ${adminToken.body.token}`).send(mockedCompany)
        const companies = await request(app).get('/companies').set('Authorization', `Bearer ${adminToken.body.token}`)
        mockedJob.companies = companies.body[0].id
        await request(app).post('/technologies').send(mockedTechnology)

    })

    afterAll(async() => {
        await connection.destroy()
    })

    test('POST /jobs -  Must be able to create a job',async () => {
        const admin = await request(app).post('/session').send(mockedAdminLogin)
        const response = await request(app).post('/jobs').set('Authorization', `Bearer ${admin.body.token}`).send(mockedJob)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('wage')
        expect(response.body).toHaveProperty('modality')
        expect(response.body).toHaveProperty('jobLevel')
        expect(response.body).toHaveProperty('jobUrl')
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('createdAt') 
        expect(response.body).toHaveProperty('techs')  
    })

    
    test('POST /jobs -  should not be able to create job without authentication',async () => {
        const response = await request(app).post('/jobs').send(mockedJob)
        
        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(401)
        
    })

    test('POST /jobs -  should not be able to create job with invalid companyId',async () => { 
        
        const admin = await request(app).post('/session').send(mockedAdminLogin)
        
        const response = await request(app).post('/jobs').set('Authorization', `Bearer ${admin.body.token}`).send(mockedJobInvalidCompanyId)
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
     
    })
    
    test('POST /jobs -  should not be able to create a job without admin permissions',async () => {
      
        const user = await request(app).post('/session').send(mockedUserLogin)
        const response = await request(app).post('/jobs').set('Authorization', `Bearer ${user.body.token}`).send(mockedJob)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(403)
     
    })

    test('POST /jobs -  An admin should not be allowed to created a job that company does not belong to him',async () => {
      
       await request(app).post('/users').send(mockedAdmin2)

        const adminLoginResponse = await request(app).post('/session').send(mockedAdminLogin2)

        const response = await request(app).post('/jobs').set('Authorization', `Bearer ${adminLoginResponse.body.token}`).send(mockedJob)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(403)
     
    })

    
    test('PATCH /jobs -  Must be able to patch a job',async () => {
        const admin = await request(app).post('/session').send(mockedAdminLogin)
        const job = await request(app).get('/jobs')
        const response = await request(app).patch(`/jobs/${job.body[0].id}`).set('Authorization', `Bearer ${admin.body.token}`).send(mockedJobPatch)

        expect(response.body).toHaveProperty('wage')
        expect(response.body).toHaveProperty('modality')
        expect(response.body).toHaveProperty('jobLevel')
        expect(response.body).toHaveProperty('jobUrl')
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('createdAt')
        expect(response.body.wage).toStrictEqual('100000')
        expect(response.body.modality).toStrictEqual('Presencial')
        expect(response.body.jobLevel).toStrictEqual('Pleno')
        expect(response.status).toBe(200)
     
    })
    

    test('GET /jobs -  Must be able to list all jobs', async () => {
        const response = await request(app).get('/jobs')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
    
    })

    test('GET /jobs/companies/id -  Must be able to list all jobs from a company', async () => {
        const response = await request(app).get(`/jobs/companies/${mockedJob.companies}`)
        
        expect(response.status).toBe(200)
        expect(response.body.job).toHaveLength(1)
    
    })

    test('GET /jobs/companies/id -  Should not be able to list all jobs from a company with invalid id', async () => {
        
        const response = await request(app).get(`/jobs/companies/${mockedJobInvalidCompanyId.companies}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
    
    })

    test('DELETE /jobs -  should not to be able to delete a job without admin permission',async () => { 
        const admin = await request(app).post('/login').send(mockedUserLogin)
        const job = await request(app).get('/jobs')
        const response = await request(app).delete('/jobs').set('Authorization', `Bearer ${admin.body.token}`).send(job.body[0].id)

        expect(response.status).toBe(404)
    })

    test('DELETE /jobs -  should not to be able to delete a job without auth token',async () => { 
        const job = await request(app).get('/jobs')
        const response = await request(app).delete('/jobs').send(job.body[0].id)

        expect(response.status).toBe(404)
    })

    test('DELETE /jobs -  should be able to delete a job',async () => { 
        const admin = await request(app).post('/session').send(mockedAdminLogin)
        const job = await request(app).get('/jobs')
        const response = await request(app).delete(`/jobs/${job.body[0].id}`).set('Authorization', `Bearer ${admin.body.token}`)

        expect(response.status).toBe(204)
    })
})