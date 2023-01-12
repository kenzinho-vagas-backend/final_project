import * as yup from 'yup'
import { SchemaOf } from 'yup'
import { ICompanyRequest, ICompanyResponse } from '../../interfaces/company.interface'

export const createCompanySchema: SchemaOf<ICompanyRequest> = yup.object().shape({
    companyName: yup.string().required()
})


export const companyWithIdSerializer: SchemaOf<ICompanyResponse> = yup.object().shape({
  companyName: yup.string(),
  id: yup.string(),
  user: yup.string()  
})

export const allCompaniesResponseSerializer: SchemaOf<ICompanyRequest[]> = yup.array(companyWithIdSerializer)