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
import { UpdateProjectDto } from './dto/update-project.dto';
@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Post('teams/:teamId/projects')
  createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Param('teamId', ParseIntPipe) teamId: number,
  ) {
    return this.projectsService.createProject(teamId, createProjectDto);
  }
  @Get('teams/:teamId/projects')
  getProjects(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.projectsService.getProjectsByTeamId(teamId);
  }
  @Get('projects/:projectId')
  getProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectsService.getProjectByProjectId(projectId);
  }
  @Delete('projects/:projectId')
  deleteProject(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.projectsService.deleteProjectByProjectId(projectId);
  }
  @Patch('projects/:projectId')
  updateProject(
    @Body() updateProjectDto: UpdateProjectDto,
    @Param('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.projectsService.updateProjectByProjectId(
      projectId,
      updateProjectDto,
    );
  }
}
