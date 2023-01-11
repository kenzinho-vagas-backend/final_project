import * as yup from 'yup'

export const createJobSerializer = yup.object().shape({
    wage: yup.string().required('Wage is a required field'),
    modality: yup.string().required('Modality is a required field'),
    jobLevel: yup.string().required('Job level is a required field'),
    jobUrl: yup.string().required('Job url is a required field'),
    companies: yup.string().uuid(),
    technologies: yup.string().uuid()
})