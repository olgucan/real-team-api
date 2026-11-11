import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Team } from './entities/team.entity';
import { User } from 'src/users/entities/user.entity';
import { TeamMember } from 'src/team-members/entities/team-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, User, TeamMember])],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
