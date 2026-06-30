import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from './decorators/raw-headers';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces';
import { Auth } from './decorators/auth.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from '../products/entities';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiResponse({status:HttpStatus.CREATED, description: 'User successfully created', type: User})
  @ApiResponse({status:HttpStatus.OK, description: 'User successfully created', type: User})
  @ApiResponse({status:HttpStatus.BAD_REQUEST, description: 'There are problems to create the user', type: User})
  @ApiResponse({status:HttpStatus.INTERNAL_SERVER_ERROR, description: 'Server Error', type: User})
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @ApiResponse({status:HttpStatus.OK, description: 'Login successful'})
  @ApiResponse({status:HttpStatus.UNAUTHORIZED, description: 'Credentials are not valid'})
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiResponse({status:HttpStatus.OK, description: 'New JWT token'})
  @ApiResponse({status:HttpStatus.UNAUTHORIZED, description: 'User unauthorized'})
  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }


  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivate(@GetUser() user: User,
                 @GetUser('email') userEmail: string,
                 @RawHeaders() rawHeaders: string[],
  ) {

    return {
      ok: true,
      message: 'Hello World!',
      user,
      userEmail,
      rawHeaders,
    };
  }

  @Get('private2')
  //@SetMetadata('roles', ['admin', 'super-user'])
  @RoleProtected(ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute(@GetUser() user: User) {

    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute3(@GetUser() user: User) {

    return {
      ok: true,
      user,
    };
  }

}
