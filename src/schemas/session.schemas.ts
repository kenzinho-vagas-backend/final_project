import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ISessionRequest } from '../interfaces/session.interface'

const sessionSchema: SchemaOf<ISessionRequest> = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
})

export { sessionSchema }