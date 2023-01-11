import AppDataSource from '../../data-source'
import { Technology } from '../../entities/technologies.entity'

const deleteTechnologyService = async (techId: string) => {
    const technologyRepository = AppDataSource.getRepository(Technology)
    await technologyRepository.delete({ id: techId})
}

export default deleteTechnologyService
