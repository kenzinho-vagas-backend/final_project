import { Request, Response } from 'express'
import listTechnologiesService from '../../services/techs/listTechs.service'

const listTechnologiesController = async(req: Request, res: Response) => {
    const technologies = await listTechnologiesService()
    return res.json(technologies)
}


export { listTechnologiesController }