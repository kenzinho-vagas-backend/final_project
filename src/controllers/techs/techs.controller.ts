import { Request, Response } from 'express'
import createTechnologyService from '../../services/techs/createTech'
import deleteTechnologyService from '../../services/techs/deleteTech'
import listTechnologiesService from '../../services/techs/listTechs'

const createTechnologyController = async(req: Request, res: Response) => {

    const { tech } = req.body
    const newTechnology = await createTechnologyService(tech)
    return res.status(201).json(newTechnology)

}

const listTechnologiesController = async(req: Request, res: Response) => {

    const technologies = await listTechnologiesService()
    return res.json(technologies)
}

const deleteTechnolyController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    await deleteTechnologyService(id)
    return res.status(200).send()
}



export { createTechnologyController, listTechnologiesController, deleteTechnolyController }