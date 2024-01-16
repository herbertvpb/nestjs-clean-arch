import { Inject, Injectable } from '@nestjs/common';
import { IProjectRepository } from '../project.repository';

@Injectable() // Permitir que seja usado como um serviço
export class FindAllProjectsUseCase {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepo: IProjectRepository,
  ) {}

  execute() {
    return this.projectRepo.findAll();
  }
}
