import { DataSource } from 'typeorm';
import AppDataSource from '../../../data-source'
import request from 'supertest'
import app from '../../../app'

describe('/companies', () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error(err)
        })
    })
})