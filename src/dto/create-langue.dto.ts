import { IsNotEmpty, IsString } from "class-validator";

export  class CreateLangueDto{
    @IsString({message:'le nom doit etre une chaine de caractere'})
    @IsNotEmpty({message:'le nom  doit etre requis'})
    nom : string
}