import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
@Injectable()
export class AuthService {


    // Injecte le service JWT pour gérer la création et la vérification des tokens
    constructor(private jwtService: JwtService, private readonly databaseService: DatabaseService) { }

    // Méthode pour authentifier un utilisateur et générer un token JWT
    async login(user: any) {
        // Création du payload du token JWT
        // sub : identifiant unique de l'utilisateur (subject)
        // email : adresse email de l'utilisateur
        const payload = {
            sub: user.id,
            email: user.email
        }

        // Retourne un objet contenant le token d'accès (access_token)
        // Le token est signé avec le payload et la clé secrète
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
