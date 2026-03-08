import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User } from 'types/userType';

@Injectable()
export class UsersService {

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

    create(user: CreateUserDto): User {
        const newid = (this.users.length + 1);
        const newUser: User = {
            ...user,
            id: newid,
        }
        this.users.push(newUser);

        return newUser;

    }
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
