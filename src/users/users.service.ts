import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'types/userType';

@Injectable()
export class UsersService {


    constructor(private readonly databaseService: DatabaseService) {

      }
    private users: User[] = [
        { id: 1, name: "Alice", email: "alice@example.com", password: "password123" },
        { id: 2, name: "Bob", email: "bob@example.com", password: "password456" },
        { id: 3, name: "Charlie", email: "charlie@example.com", password: "password789" },
    ];
    findAll(): User[] {
        return this.users;
    }


    findOne(id: number):User{

        const user = this.users.find((user) => user.id === id) ;
        if(!user){
            throw  new NotFoundException('user not found');
        }
        return user;
    }

    // create(user: Prisma.UserCreateInput) {
       
    //     const { email, password } = CreateUserDto
    //     const hashedPassword =  bcrypt.
    //     return this.databaseService.user.create({
           
    //     })

    // }
    update(id: number, user: UpdateUserDto): User{

        const index = this.users.findIndex((use) => use.id === id)
        this.users[index] = {
            id,
            ...user

        };
        return this.users[index];

    }

    delete(id: number): String {
        this.users = this.users.filter((user) => user.id !== id)
        return 'User deleted sucessfully';
    }


}
