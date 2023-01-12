import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ITechRequest, ITechResponse } from '../../interfaces/technology.interface'

export const techSerializer: SchemaOf<ITechRequest> = yup.object().shape({
    tech: yup.string().required()
})

export const techSerializerResponse: SchemaOf<ITechResponse>  = yup.object().shape({
    tech: yup.string().required(),
    id: yup.string().required()
})