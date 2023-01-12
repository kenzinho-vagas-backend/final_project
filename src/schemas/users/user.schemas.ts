import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { IUserRequest, IUserUpdate } from '../../interfaces/user.interface'

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

export const updateUserSerializer: SchemaOf<IUserUpdate> = yup.object().shape({
    jobLevel: yup.string().notRequired(),
    specialty: yup.string().notRequired(),
    password: yup.string().notRequired(),
    bio: yup.string().notRequired(),
    linkedin: yup.string().notRequired(),
    email: yup.string().email().notRequired()
})