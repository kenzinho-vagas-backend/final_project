import { ITechRequest } from "./technology.interface"

export interface IUserJobRequest {
    userId: string
    jobId: string
}

export interface IJobRequest {
    wage: string
    modality: string
    jobLevel: string
    jobUrl: string
    techs: ITechRequest[]
}

export interface IJobResponse {
    wage: string
    modality: string
    jobLevel: string
    jobUrl: string
    companiesId: string
    createdAt: Date
}