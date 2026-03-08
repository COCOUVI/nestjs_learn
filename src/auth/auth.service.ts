import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { LoginDto } from 'src/dto/login.dto';
@Injectable()
export class AuthService {


    // Injecte le service JWT pour gérer la création et la vérification des tokens
    constructor(private jwtService: JwtService, private readonly databaseService: DatabaseService) { }

    async login(loginDto: LoginDto) {

        const { email, password } = loginDto

        const user = await this.databaseService.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new UnauthorizedException("Email ou mot de passe incorrect")
        }

        const passwordValid = await bcrypt.compare(password, user.password)

        if (!passwordValid) {
            throw new UnauthorizedException("Email ou mot de passe incorrect")
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        }

        return {
            access_token: this.jwtService.sign(payload)
        }

    }


    async register(createUserDto: CreateUserDto) {

        const { name, email, password, langueId } = createUserDto
        const existingUser = await this.databaseService.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            throw new ConflictException("Cet email est déjà utilisé")
        }

        const langue = await this.databaseService.langue.findUnique({
            where: { id: langueId }
        })

        if (!langue) {
            throw new NotFoundException("Langue invalide")
        }
        const hashedPassword = bcrypt.hashedPassword(password, 10)
        return this.databaseService.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                langueId
            }
        })

    }
}
