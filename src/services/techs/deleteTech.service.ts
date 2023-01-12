import AppDataSource from '../../data-source'
import { Technology } from '../../entities/technologies.entity'

const deleteTechnologyService = async (id: string) => {
    const technologyRepository = AppDataSource.getRepository(Technology)
    await technologyRepository.delete({ id: id})
}

export default deleteTechnologyService
