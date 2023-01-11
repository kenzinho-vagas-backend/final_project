import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUserRequest } from '../../interfaces/user.interface'

export const createUserSerializer: SchemaOf<IUserRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    isAdm: yup.boolean().required(),
    linkedin: yup.string().required(),
    bio: yup.string(),
    specialty: yup.string().required(),
    jobLevel: yup.string().required()
})