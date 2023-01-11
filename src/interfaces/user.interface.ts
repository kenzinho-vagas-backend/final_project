interface IUserRequest {
    name: string,
    email: string,
    password: string,
    isAdm: boolean,
    linkedin: string,
    bio?: string,
    specialty: string,
    jobLevel: string
}

export { IUserRequest }