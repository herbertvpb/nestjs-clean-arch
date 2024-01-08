import { Repository } from 'typeorm';
import { Project, ProjectStatus } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StartProjectDto } from '../dto/start-project.dto';

@Injectable() // Permitir que seja usado como um serviço
export class StartProjectUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async execute(id: string, input: StartProjectDto) {
    const project = await this.projectRepo.findOneOrFail({ where: { id } });

    if (project.status === ProjectStatus.Active) {
      throw new Error('Cannot start active project');
    }

    if (project.status === ProjectStatus.Completed) {
      throw new Error('Cannot start completed project');
    }

    if (project.status === ProjectStatus.Cancelled) {
      throw new Error('Cannot start completed project');
    }

    project.started_at = input.started_at;
    project.status = ProjectStatus.Active;
  }
}
