import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class nameDto {
    @IsString()
    @ApiProperty()
    name: string    
}

export class EmailDto {
    @IsEmail()
    @ApiProperty()
    email: string
}

export class InsertUpdateReturnDto {
    @ApiProperty()
    status: string
}

export class IdDto {
    @ApiProperty()
    id: number
}

export class ReturnRegisterDto {
    @IsNumber()
    @ApiProperty()
    register: number
}

export class UsernameDto {
    @IsString()
    @ApiProperty()
    username: string
}

// Errors *****************
export class ErrorDto {
    @ApiProperty()
    statusCode: number

    @ApiProperty()
    message: string

    @ApiProperty()
    error: string
}