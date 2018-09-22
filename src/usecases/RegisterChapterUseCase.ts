import ErrorService from '@/services/ErrorService'
import ProjectTreeEntity from '@/entities/ProjectTree'
import ProjectTreeRepository from '@/repositories/ProjectTreeRepository'

export interface IRegisterChapterUseCase {
  projectTreeEntity: ProjectTreeEntity
  projectTreeRepository: ProjectTreeRepository
  errorService: ErrorService
}

export default class RegisterChapterUseCase implements UseCase {
  projectTreeEntity: ProjectTreeEntity
  projectTreeRepository: ProjectTreeRepository
  errorService: ErrorService

  constructor({ projectTreeEntity, projectTreeRepository, errorService }: IRegisterChapterUseCase) {
    this.projectTreeEntity = projectTreeEntity
    this.projectTreeRepository = projectTreeRepository;
    this.errorService = errorService
  }

  async execute(name: string): Promise<void> {
    try {
      this.projectTreeEntity.registerChapter({ name })
      this.projectTreeRepository.save(this.projectTreeEntity)

    } catch (error) {
      await this.errorService.handle(error)
      throw new Error(error)
    }
  }
}
