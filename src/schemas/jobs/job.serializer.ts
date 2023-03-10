import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IJobRequest, IJobResponse } from '../../interfaces/job.interface'

export const createJobSerializer: SchemaOf<IJobRequest> = yup.object().shape({
    wage: yup.string().required('Wage is a required field'),
    modality: yup.string().required('Modality is a required field'),
    jobLevel: yup.string().required('Job level is a required field'),
    jobUrl: yup.string().required('Job url is a required field'),
    companies: yup.string().required(),
    techs: yup.string().required()

})

export const returnJobSerializer: SchemaOf<IJobResponse>= yup.object().shape({
    wage: yup.string(),
    modality: yup.string(),
    jobLevel: yup.string(),
    jobUrl: yup.string(),
    companies: yup.string(),
    createdAt: yup.date(),
    id: yup.string(),
    techs: yup.string()
})

export const returnedSaveJob = yup.object().shape({
    id: yup.string(),
    jobId: yup.string(),
    userId: yup.string()
})

