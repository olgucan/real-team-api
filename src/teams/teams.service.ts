import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}
  async create(createTeamDto: CreateTeamDto) {
    const createdTeam = this.teamRepository.create(createTeamDto);
    const savedTeam = await this.teamRepository.save(createdTeam);

    return savedTeam;
  }

  findAll() {
    return this.teamRepository.find();
  }

  async findOne(id: number) {
    const user = await this.teamRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        members: {
          user: true,
        },
      },
    });
    return user;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
