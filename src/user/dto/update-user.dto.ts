import { IsNumber, IsString } from "class-validator"

export class UpdateUserIdDto{
    @IsNumber()
    id: number
}

export class UpdateUserDto{
    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsString()
    email: string
}

export class UpdateUserPasswordDto{
    id: number
    
    @IsString()
    password: string
}

export class UpdateUserStatusDto{
    id: number
    
    @IsString()
    status: string
}