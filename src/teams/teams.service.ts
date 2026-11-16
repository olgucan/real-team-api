import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddTeamMemberDto } from './dto/add-team-member.dto';
import { User } from 'src/users/entities/user.entity';
import { TeamMember } from 'src/team-members/entities/team-member.entity';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
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
    const team = await this.teamRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        members: {
          user: true,
        },
      },
    });
    return team;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }

  async addMember(id: number, addTeamMemberDto: AddTeamMemberDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: addTeamMemberDto.userId,
      },
    });
    const team = await this.teamRepository.findOne({
      where: {
        id: id,
      },
    });
    const member = await this.teamMemberRepository.findOne({
      where: {
        user: {
          id: addTeamMemberDto.userId,
        },
        team: {
          id: id,
        },
      },
    });
    if (!user || !team) {
      throw new NotFoundException('There is no such user or team');
    }
    if (member) {
      throw new ConflictException('User is already in the team');
    }
    const newTeamMember = this.teamMemberRepository.create({
      user,
      team,
      role: addTeamMemberDto.role,
    });
    return await this.teamMemberRepository.save(newTeamMember);
  }

  async removeMember(teamId: number, memberId: number) {
    const member = await this.teamMemberRepository.findOne({
      where: {
        id: memberId,
      },
      relations: {
        team: true,
      },
    });
    if (!member) {
      throw new NotFoundException('this id doesnt belong to any member');
    }
    if (teamId != member.team.id) {
      throw new NotFoundException('There is no such team in this  id');
    }
    return await this.teamMemberRepository.delete(member.id);
  }
  async updateMember(
    teamId: number,
    memberId: number,
    updateTeamMemberDto: UpdateTeamMemberDto,
  ) {
    const member = await this.teamMemberRepository.findOne({
      where: {
        id: memberId,
      },
      relations: {
        team: true,
      },
    });
    if (!member) {
      throw new NotFoundException('this id doesnt belong to any member');
    }
    if (teamId !== member.team.id) {
      throw new NotFoundException('There is no such team in this  id');
    }
    return await this.teamMemberRepository.update(
      member.id,
      updateTeamMemberDto,
    );
  }
}
