import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto{

    @IsString({message:'le nom doit etre une chaine de caracteres'})
    @IsNotEmpty({message:'Le nom est requis '})
    name?: string;

    @IsString({message:'l\'email doit etre une chaine de caracteres'})
    @IsNotEmpty({message:'l\'email est requis '})
    @IsEmail({},{message:'Cet email n\'est pas valide'})

    email?: string;
    @IsString({message:'l\'email doit etre une chaine de caracteres'})
    @IsNotEmpty({message:'l\'email est requis '})
    @MinLength(8,{message:'le mot de passe doit etre d\'au moins 8 caracteres'})
    password: string;

}