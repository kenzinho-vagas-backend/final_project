export interface IUserJobRequest {
    jobId: string
}

export interface IUserJobResponse {
    id: string
    userId: string
    jobId: string
}

export interface IJobRequest {
    wage: string
    modality: string
    jobLevel: string
    jobUrl: string
    companies: string
    techs: string
}

export interface IUpdateJobRequest {
    wage?: string
    modality?: string
    jobLevel?: string
    jobUrl?: string
    companies: string
}

export interface IJobResponse {
    wage: string
    modality: string
    jobLevel: string
    jobUrl: string
    companies: string
    createdAt: Date
    id: string
    techs: string
}