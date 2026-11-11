import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Team } from 'src/teams/entities/team.entity';
@Entity()
@Unique(['user', 'team'])
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

  @ManyToOne(() => User, (user) => user.teamMemberships)
  user: User;

  @ManyToOne(() => Team, (team) => team.members)
  team: Team;
}
