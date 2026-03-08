import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/login.dto';




@Controller('auth')
export class AuthController {



    constructor(private readonly authService: AuthService) { }

    @HttpCode(201)
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const data = await this.authService.register(createUserDto)

         return {
            "message":"user created succesfully",
             "data":data 
         }
    }


    @Post('login')
    async login(@Body() loginDto: LoginDto) {
          const {access_token} =  await this.authService.login(loginDto)

          return {
             'accces_token' :access_token ,
             'message':'connect successfully'
          }



    }

    

}


