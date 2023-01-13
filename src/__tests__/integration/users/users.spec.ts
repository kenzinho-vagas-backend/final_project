import { DataSource } from 'typeorm'
import AppDataSource from '../../../data-source'
import request from 'supertest'
import app from '../../../app'
import { mockedAdmin, mockedAdminLogin, mockedUser, mockedUserLogin } from '../../mocks'

describe('Testing users', () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => console.error(err))
    })

    afterAll(async () => {
        await connection.destroy()
    })

    test('POST /users - Should be able to create user', async () => {
        const response = await request(app).post('/users').send(mockedUser)

        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('name')
        expect(response.body).toHaveProperty('email')
        expect(response.body).toHaveProperty('isAdm')
        expect(response.body).toHaveProperty('isActive')
        expect(response.body).toHaveProperty('createdAt')
        expect(response.body).toHaveProperty('updatedAt')
        expect(response.body).toHaveProperty('deletedAt')
        expect(response.body).toHaveProperty('jobLevel')
        expect(response.body).toHaveProperty('bio')
        expect(response.body).toHaveProperty('linkedin')
        expect(response.body).toHaveProperty('specialty')
        expect(response.body).not.toHaveProperty('password')
        expect(response.body.name).toEqual('Jorge')
        expect(response.body.email).toEqual('jorge@mail.com')
        expect(response.body.isAdm).toEqual(false)
        expect(response.body.isActive).toEqual(true)
        expect(response.status).toBe(201)   
    })

    test('POST /users - Should not be able to create a user that already exists', async () => {
        const response = await request(app).post('/users').send(mockedUser)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(409)   
    })

    test('GET /users - Should be able to list all users', async () => {
        await request(app).post('/users').send(mockedAdmin)
        const adminLoginResponse = await request(app).post('/session').send(mockedAdminLogin)
        const response = await request(app).get('/users').set('Authorization', `Bearer ${adminLoginResponse.body.token}`)

        expect(response.body).toHaveLength(2)
        expect(response.body[0]).not.toHaveProperty('password')
    })

    test('GET /users - Should not be able to list users without authentication', async () => {
        const response = await request(app).get('/users')

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(401)
    })

    test('GET /users - Should not be able to list users not being admin', async () => {
        const userLoginResponse = await request(app).post('/session').send(mockedUserLogin)
        const response = await request(app).get('/users').set('Authorization', `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(403)
             
    })

    test('GET /users/:id - Should not be able to list profile without authentication', async () => {
        const response = await request(app).get('/users/:id')

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(401)
    })
    
    test('GET /users/:id - Should not be able to list profile without a valid ID', async () => {
        const userLoginResponse = await request(app).post('/session').send(mockedUserLogin)
        const response = await request(app).get('/users/13970660-5dbe-423a-9a9d-5c23b37943cf').set('Authorization', `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(404)
    })

    test('DELETE /users/:id - Should not be able to delete user without authentication', async () => {
        const adminLoginResponse = await request(app).post('/session').send(mockedAdminLogin);
        const userToBeDeleted = await request(app).get('/users').set('Authorization', `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(401)
             
    })

    test('DELETE /users/:id - Should not be able to delete user not being admin', async () => {
        const userLoginResponse = await request(app).post('/session').send(mockedUserLogin)
        const adminLoginResponse = await request(app).post('/session').send(mockedAdminLogin)
        const userToBeDeleted = await request(app).get('/users').set('Authorization', `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`).set('Authorization', `Bearer ${userLoginResponse.body.token}`)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(403)
             
    })

    test('DELETE /users/:id - Must be able to soft delete user', async () => {
        await request(app).post('/users').send(mockedAdmin)

        const adminLoginResponse = await request(app).post('/session').send(mockedAdminLogin)
        const userToBeDeleted = await request(app).get('/users').set('Authorization', `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`).set('Authorization', `Bearer ${adminLoginResponse.body.token}`)
        const findUser = await request(app).get('/users').set('Authorization', `Bearer ${adminLoginResponse.body.token}`)
        
        expect(response.status).toBe(204)
        expect(findUser.body[0].isActive).toBe(false)
    })

    test('DELETE /users/:id - Should not be able to delete user with isActive = false', async () => {
        await request(app).post('/users').send(mockedAdmin)

        const adminLoginResponse = await request(app).post('/session').send(mockedAdminLogin);
        const userToBeDeleted = await request(app).get('/users').set('Authorization', `Bearer ${adminLoginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userToBeDeleted.body[0].id}`).set('Authorization', `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('message')
    })

    test('DELETE /users/:id - Should not be able to delete user with invalid id',async () => {
        await request(app).post('/users').send(mockedAdmin)

        const adminLoginResponse = await request(app).post('/session').send(mockedAdminLogin)
        
        const response = await request(app).delete(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set('Authorization', `Bearer ${adminLoginResponse.body.token}`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('message')
     
    })

    test('PATCH /users/:id - Should not be able to update user without authentication',async () => {
        const adminLoginResponse = await request(app).post('/session').send(mockedAdminLogin)
        const userTobeUpdate = await request(app).get('/users').set('Authorization', `Bearer ${adminLoginResponse.body.token}`)
        const response = await request(app).patch(`/users/${userTobeUpdate.body[0].id}`)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(401)
             
    })

    test('PATCH /users/:id - Should not be able to update user with invalid id',async () => {
        const newValues = {email: 'marcossimoes@mail.com'}

        const admingLoginResponse = await request(app).post('/session').send(mockedAdminLogin)
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get('/users').set('Authorization', token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/13970660-5dbe-423a-9a9d-5c23b37943cf`).set('Authorization',token).send(newValues)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(404)
    })

    test('PATCH /users/:id - Should be able to update user', async () => {
        const newValues = {email: 'marcossimoes14@mail.com'}

        const admingLoginResponse = await request(app).post('/session').send(mockedAdminLogin);
        const token = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get('/users').set('Authorization', token)
        const userTobeUpdateId = userTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set('Authorization',token).send(newValues)

        const userUpdated = await request(app).get('/users').set('Authorization', token)

        expect(response.status).toBe(200)
        expect(userUpdated.body[0].email).toEqual('marcossimoes14@mail.com')
        expect(userUpdated.body[0]).not.toHaveProperty('password')
    })    

    test('PATCH /users/:id - Should not be able to update another user without adm permission',async () => {
        const newValues = {jobLevel: 'Senior'}

        const userLoginResponse = await request(app).post('/session').send(mockedUser);
        const admingLoginResponse = await request(app).post('/session').send(mockedAdminLogin);
        const userToken = `Bearer ${userLoginResponse.body.token}`
        const adminToken = `Bearer ${admingLoginResponse.body.token}`
        
        const userTobeUpdateRequest = await request(app).get('/users').set('Authorization', adminToken)
        const userTobeUpdateId = userTobeUpdateRequest.body[1].id

        const response = await request(app).patch(`/users/${userTobeUpdateId}`).set('Authorization',userToken).send(newValues)

        expect(response.body).toHaveProperty('message')
        expect(response.status).toBe(401)
    })
})