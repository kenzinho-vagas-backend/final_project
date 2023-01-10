import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { string } from 'yup/lib/locale';
import { ICompanyRequest } from '../interfaces/company.interface';

const companyWithIdSerializer: SchemaOf<ICompanyRequest> = yup.object().shape({
    companyName: yup.string().required(),
    id: yup.string().required()
})

export { companyWithIdSerializer }