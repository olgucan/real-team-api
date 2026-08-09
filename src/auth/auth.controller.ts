import { Body, Controller, Post, Req, UseGuards, Get } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @ApiBearerAuth()
  @Get('me')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user.sub);
  }
}
