import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class AddTeamMemberDto {
  @IsInt()
  userId: number;

  @IsString()
  @IsNotEmpty()
  role: string;
}
