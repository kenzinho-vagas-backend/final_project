import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ICompanyRequest, ICompanyResponse } from '../../interfaces/company.interface'

export const companyWithIdSerializer: SchemaOf<ICompanyRequest> = yup.object().shape({
    companyName: yup.string().required(),
    id: yup.string().required(),
    user: yup.array(),
    job: yup.array()
})

export const allCompaniesResponseSerializer: SchemaOf<ICompanyRequest[]> = yup.array(companyWithIdSerializer)