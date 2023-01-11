import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest"
import app from "../../../app";
import {mockedJob, mockedAdmin, mockedAdminLogin, mockedCompany, mockedUser, mockedUserLogin, mockedJobInvalidCompanyId, mockedTechnology,mockedJobPatch} from "../../mocks"

describe("/properties", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
        await request(app).post('/users').send(mockedAdmin)
        await request(app).post('/users').send(mockedUser)
        const adminToken = await request(app).post("/login").send(mockedAdminLogin)
        await request(app).post('/companies').set("Authorization", `Bearer ${adminToken.body.token}`).send(mockedCompany)
        await request(app).post('/technologies').send(mockedTechnology)

    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /job -  Must be able to create a job",async () => {
        const companies = await request(app).get('/companies')
        const admin = await request(app).post("/login").send(mockedAdminLogin);
        mockedJob.companies = companies.body.id[0]
        const response = await request(app).post('/job').set("Authorization", `Bearer ${admin.body.token}`).send(mockedJob)

        expect(response.body).toHaveProperty("wage")
        expect(response.body).toHaveProperty("modality")
        expect(response.body).toHaveProperty("jobLevel")
        expect(response.body).toHaveProperty("jobUrl")
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.status).toBe(201)
     
    })

    test("POST /job -  should not be able to create a job without admin permissions",async () => {
      
        const user = await request(app).post("/login").send(mockedUserLogin);
        const response = await request(app).post('/job').set("Authorization", `Bearer ${user.body.token}`).send(mockedJob)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /job -  should not be able to create job without authentication",async () => {
        const response = await request(app).post('/properties').send(mockedJob)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /job -  should not be able to create job with invalid companyId",async () => { 
        const admin = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).post('/properties').set("Authorization", `Bearer ${admin.body.token}`).send(mockedJobInvalidCompanyId)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
     
    })

    test("PATCH /job -  Must be able to patch a job",async () => {
        const admin = await request(app).post("/login").send(mockedAdminLogin);
        const response = await request(app).patch('/job').set("Authorization", `Bearer ${admin.body.token}`).send(mockedJobPatch)

        expect(response.body).toHaveProperty("wage")
        expect(response.body).toHaveProperty("modality")
        expect(response.body).toHaveProperty("jobLevel")
        expect(response.body).toHaveProperty("jobUrl")
        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body.wage).toStrictEqual("10000")
        expect(response.body.modality).toStrictEqual("Presencial")
        expect(response.body.jobLevel).toStrictEqual("Pleno")
        expect(response.status).toBe(201)
     
    })
    

    test("GET /job -  Must be able to list all jobs",async () => {
        const response = await request(app).get('/job')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
    
    })

    test("GET /job/companies/id -  Must be able to list all jobs from a company", async () => {
        const companies = await request(app).get('/companies')
        const response = await request(app).get(`/job/companies/${companies.body.id[0]}`)
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
    
    })

    // test("GET /job/id/users -  Must be able to list all candidates from a job", async () => {
    //     const admin = await request(app).post("/login").send(mockedUserLogin);
    //     const job = await request(app).get("/job")
    //     const response = await request(app).get(`/job/${job.body.id[0]}/users`).set("Authorization", `Bearer ${admin.body.token}`).send(job.body.id[0])
    
    // })

    test("DELETE /job -  should not to be able to delete a job without admin permission",async () => { 
        const admin = await request(app).post("/login").send(mockedUserLogin);
        const job = await request(app).get("/job")
        const response = await request(app).delete('/job').set("Authorization", `Bearer ${admin.body.token}`).send(job.body.id[0])

        expect(response.status).toBe(200)
    })

    test("DELETE /job -  should not to be able to delete a job without auth token",async () => { 
        const job = await request(app).get("/job")
        const response = await request(app).delete('/job').send(job.body.id[0])

        expect(response.status).toBe(200)
    })

    test("DELETE /job -  should be able to delete a job",async () => { 
        const admin = await request(app).post("/login").send(mockedAdminLogin);
        const job = await request(app).get("/job")
        const response = await request(app).delete('/job').set("Authorization", `Bearer ${admin.body.token}`).send(job.body.id[0])
        const jobs = await request(app).get("/job")

        expect(jobs).toHaveLength(0)
        expect(response.status).toBe(200)
    })

    // test("GET /job -  Must be able to list all jobs from a technology", async () => {
    //     const technology = await request(app).get('/technologies')
    //     const response = await request(app).get(`/job/technologies/${technology.body.id[0]}`)
    //     expect(response.body).toHaveLength(1)
    //     expect(response.status).toBe(200)
    
    // })
})