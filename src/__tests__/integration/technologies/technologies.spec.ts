import { DataSource } from 'typeorm'
import AppDataSource from '../../../data-source'
import request from 'supertest'
import app from '../../../app'
import { mockedAdmin, mockedAdminLogin, mockedCompany, mockedJob, mockedUser2, mockedUserLogin2 } from '../../mocks'

describe('/techs', () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error('Error during Data Source initialization', err)
        })
        await request(app).post('/users').send(mockedAdmin)
        await request(app).post('/users').send(mockedUser2)
        const user = await request(app).post('/session').send(mockedUserLogin2)
        
        const admin = await request(app).post('/session').send(mockedAdminLogin)

        const company = await request(app).post('/companies').send(mockedCompany).set('Authorization', `Bearer ${admin.body.token}`)
        
        const newJob = {...mockedJob, companies: company.body.id}
        
        await request(app).post('/jobs').send(newJob).set('Authorization', `Bearer ${admin.body.token}`)

       
        const jobs = await request(app).get('/jobs')

        await request(app).post('/jobUser').set('Authorization', `Bearer ${user.body.token}`).send(jobs.body[0].id)

    })

    afterAll(async() => {
        await connection.destroy()
    })


    test('GET /techs - list all technologies', async () => {
        const response = await request(app).get(`/techs`)

        expect(response.body)
        expect(response.status).toBe(200)
    })

})