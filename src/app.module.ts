import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Usado no modulo raiz
      type: 'sqlite', // Tipo do banco a ser utilizado
      database: 'memory:', // Usando o banco em memória apenas
      entities: [Project],
      synchronize: true, // Criar tabelas automaticas de acordo com os modelos
    }),
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
