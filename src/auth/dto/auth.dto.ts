import { IsString } from "class-validator"

export class AuthDto{
    @IsString()
    email: string

    @IsString()
    password: string
}

export class ReturnDataTokenDto{
    id:number

    email: string
}

export class TokenDto {    
    data: ReturnDataTokenDto

    iat: number

    exp: number
}
