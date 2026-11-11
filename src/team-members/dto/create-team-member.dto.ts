import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  role: string;
}
