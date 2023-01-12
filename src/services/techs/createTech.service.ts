
import AppDataSource from '../../data-source'
import { Technology } from '../../entities/technologies.entity'
import AppError from '../../errors/AppError'

const createTechnologyService = async(tech: string): Promise<Technology>=> {

    const technologyRepository = AppDataSource.getRepository(Technology)

    const techs = technologyRepository.findOneBy({
        tech: tech
    })

    if(techs) {
        throw new AppError('Technology already exists', 409)
    }

    const technology = technologyRepository.create({
        tech
    })
    await technologyRepository.save(technology)
    return technology

}

export default createTechnologyService