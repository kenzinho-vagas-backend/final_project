
import AppDataSource from '../../data-source'
import { Technology } from '../../entities/technologies.entity'

const listTechnologiesService = async(): Promise<Technology[]> => {
    const technologyRepository = AppDataSource.getRepository(Technology)

    const technologies = await technologyRepository.find()

    return technologies

}

export default listTechnologiesService