import { IUserJobRequest } from '../../interfaces/job.interface'
import { IUserRequest } from '../../interfaces/user.interface'

export const mockedJob = {
    wage: '5000',
    modality: 'Remoto',
    jobLevel: 'Junior',
    jobUrl: 'http://job.com.br',
    companies: '',
    techs: "JavaScript"

}


export const mockedJob2 = {
    wage: '7000',
    modality: 'Remoto',
    jobLevel: 'Senior',
    jobUrl: 'http://jobs.com.br',
    companies: '',
    techs: 'MySQL',
    jobId: ''
}

export const mockedJob3 = {
    wage: '10000',
    modality: 'Remoto',
    jobLevel: 'Pleno',
    jobUrl: 'http://jobs.com.br',
    companies: '',
    techs: 'React',
    jobId: ''

}

export const mockedInvalidJob = {
    salario: '2000',
    modalidade: 'home office',
    nivel: 'senior',
    url: 'urlInvalida.com',
    empresa: '1',
}

export const mockedJobInvalidCompanyId = {
    wage: '5000',
    modality: 'Remoto',
    jobLevel: 'Junior',
    jobUrl: 'http://job.com.br',
    companies: '099ecc23-0aac-49b5-adf3-6a20735c91ae'
}

export const mockedJobPatch = {
    wage: '100000',
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

export const mockedAdmin2: IUserRequest = {
    name: 'Admin2',
    email: 'admin2@mail.com',
    password: 'admin2',
    isAdm: true,
    linkedin: 'http://linkedin.com/in/admin',
    bio: 'Admin do sistema',
    specialty: 'Testes',
    jobLevel: 'Pleno'
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

export const mockedAdminLogin2 = {
    email: 'admin2@mail.com',
    password: 'admin2'
}

export const mockedUserLogin = {
    email: 'jorge@mail.com',
    password: '1234'
}

export const mockedCompany = {
    companyName: 'Kenzinho'
}

export const mockedCompany2 = {
    companyName: 'Kenzinho Produções'
}

export const mockedCompany3 = {
    companyName: 'Kezinho Tecnologias'
}

export const mockedTechnology = {
    name: 'JavaScript'
}

export const mockedJobUser : IUserJobRequest = {
    jobId: ''
}

