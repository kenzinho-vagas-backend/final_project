import { Job } from '../entities/jobs.entity'
import { User } from '../entities/users.entity'

export interface ICompanyRequest {
    companyName: string
}

export interface ICompanyResponse {
    companyName: string
    id: string
    user: string
}