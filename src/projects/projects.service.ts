import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { Team } from 'src/teams/entities/team.entity';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}
  async createProject(teamId: number, createProjectDto: CreateProjectDto) {
    const team = await this.teamRepository.findOne({
      where: {
        id: teamId,
      },
    });
    if (!team) {
      throw new NotFoundException('There is no such user or team');
    }
    const project = this.projectRepository.create({
      team,
      ...createProjectDto,
    });
    return await this.projectRepository.save(project);
  }
  async getProjectsByTeamId(teamId: number) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: { projects: true },
    });
    return team;
  }
}
