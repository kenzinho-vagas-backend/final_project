
import AppDataSource from '../../data-source'
import { Technology } from '../../entities/technologies.entity'
import AppError from '../../errors/AppError'
import { ITechRequest } from '../../interfaces/technology.interface'

const createTechnologyService = async(data: ITechRequest) => {

    const technologyRepository = AppDataSource.getRepository(Technology)

    const techs = await technologyRepository.findOneBy({
        tech: data.tech
    })

    if(techs) {
        throw new AppError('Technology already exists', 409)
    }

    const technology = technologyRepository.create(data)
    await technologyRepository.save(technology)
    return technology

}

export default createTechnologyService