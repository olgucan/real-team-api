import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectsService } from './projects.service';
@Controller('teams/:teamId/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Post()
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    return this.projectsService.createProject(teamId, createProjectDto);
  }
  @Get()
  getProjects(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.projectsService.getProjectsByTeamId(teamId);
  }
}
