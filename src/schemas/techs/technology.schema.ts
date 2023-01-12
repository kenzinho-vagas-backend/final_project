import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ITechRequest } from '../../interfaces/technology.interface'


export const techSerializer: SchemaOf<ITechRequest> = yup.object().shape({
    tech: yup.string().required()
})