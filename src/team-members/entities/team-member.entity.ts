import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Team } from 'src/teams/entities/team.entity';
@Entity()
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @CreateDateColumn()
  joinedAt: Date;

  // @Column()
  // user: string;
  // @Column()
  // team: string;

  @ManyToOne(() => User, (user) => user.TeamMember) user: User;
  @ManyToOne(() => Team, (team) => team.TeamMember) team: Team;
}
