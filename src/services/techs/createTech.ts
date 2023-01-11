
import AppDataSource from '../../data-source'
import { Technology } from '../../entities/technologies.entity'

const createTechnologyService = async(tech: string): Promise<Technology>=> {

    const technologyRepository = AppDataSource.getRepository(Technology)

    const technology = technologyRepository.create({
        tech
    })
    await technologyRepository.save(technology)
    return technology

}

export default createTechnologyService