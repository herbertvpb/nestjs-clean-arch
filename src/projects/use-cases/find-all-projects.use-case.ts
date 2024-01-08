import { Repository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable() // Permitir que seja usado como um serviço
export class FindAllProjectsUseCase {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  execute() {
    return this.projectRepo.find();
  }
}
