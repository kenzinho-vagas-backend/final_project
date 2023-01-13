import { IUserRequest } from '../../interfaces/user.interface'

export const mockedJob = {
    wage: '5000',
    modality: 'Remoto',
    jobLevel: 'Junior',
    jobUrl: 'http://job.com.br',
    companies: ''
}

export const mockedInvalidJob = {
    salario: '2000',
    modalidade: 'home office',
    nivel: 'senior',
    url: 'urlInvalida.com',
    empresa: '1'
}

export const mockedJobInvalidCompanyId = {
    wage: '5000',
    modality: 'Remoto',
    jobLevel: 'Junior',
    jobUrl: 'http://job.com.br',
    companies: '099ecc23-0aac-49b5-adf3-6a20735c91ae'
}

export const mockedJobPatch = {
    wage: '10000',
    modality: 'Presencial',
    jobLevel: 'Pleno'
}

export const mockedAdmin: IUserRequest = {
    name: 'Admin',
    email: 'admin@mail.com',
    password: 'admin',
    isAdm: true,
    linkedin: 'http://linkedin.com/in/admin',
    bio: 'Admin do sistema',
    specialty: 'Testes',
    jobLevel: 'Senior'
}

export const mockedUser: IUserRequest = {
    name: 'Jorge',
    email: 'jorge@mail.com',
    password: '1234',
    isAdm: false,
    linkedin: 'http://linkedin.com/in/jorge',
    bio: 'Devinho',
    specialty: 'Front end',
    jobLevel: 'Junior'
}

export const mockedAdminLogin = {
    email: 'admin@mail.com',
    password: 'admin'
}

export const mockedUserLogin = {
    email: 'jorge@mail.com',
    password: '1234'
}

export const mockedCompany = {
    companyName: 'Kenzinho'
}

export const mockedTechnology = {
    name: 'JavaScript'
}