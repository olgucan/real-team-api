import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { TeamMember } from 'src/team-members/entities/team-member.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => TeamMember, (member) => member.user)
  TeamMember: TeamMember[];
}
