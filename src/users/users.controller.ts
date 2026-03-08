import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from 'types/userType';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { Role, Roles } from './userapp.decorator';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {

    }

    @Roles(Role.ADMIN)
    @Get('admin-only')
    getAdminData() {

        return 'this user admin'
    }

    @Get()
    @HttpCode(200)
    findAll(): User[] {
        return this.usersService.findAll()
    }


    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id', ParseIntPipe) id: number): User {
        return this.usersService.findOne(id);
    }
    @Post()
    @HttpCode(201)
    create(@Body() User: CreateUserDto): User {
        return this.usersService.create(User);
    }
    @Patch(':id')
    @HttpCode(201)
    update(@Param('id') id: number, @Body() User: UpdateUserDto): UpdateUserDto {
        return this.usersService.update(Number(id), User);
    }

    @Delete(':id')
    @HttpCode(201)
    delete(@Param('id') id: number): String {
        return this.usersService.delete(Number(id));
    }
}
