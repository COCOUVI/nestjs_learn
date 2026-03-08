import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto {

  @IsEmail({}, { message: "email invalide" })
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

}