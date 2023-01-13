import { Request, Response } from 'express'
import createTechnologyService from '../../services/techs/createTech.service'
import deleteTechnologyService from '../../services/techs/deleteTech.service'
import listTechnologiesService from '../../services/techs/listTechs.service'

const createTechnologyController = async(req: Request, res: Response) => {
    const data = req.body
    const newTechnology = await createTechnologyService(data)
    return res.status(201).json(newTechnology)
}

const listTechnologiesController = async(req: Request, res: Response) => {
    const technologies = await listTechnologiesService()
    return res.json(technologies)
}

const deleteTechnolyController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    await deleteTechnologyService(id)
    return res.status(204).send()
}

export { createTechnologyController, listTechnologiesController, deleteTechnolyController }