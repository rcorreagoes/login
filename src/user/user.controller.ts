import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto, UpdateUserStatusDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetTokenValues } from 'src/decorators/token.decorator';
import { TokenDto } from 'src/auth/dto/auth.dto';
const bcrypt  = require('bcrypt')

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() data: CreateUserDto) {
        const salt    = bcrypt.genSaltSync()
        data.password = bcrypt.hashSync(data.password, salt)
        return this.userService.create(data).then(result=>{
            return result
        }).catch(error => {
            throw new HttpException( error.message, error.status );
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Get()
    findAll() {   
        return this.userService.findAll().then(result=>{
            return result
        }).catch(error => {
            throw new HttpException( error.message, error.status );
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Get('/findbyemail/:email')
    findByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email).then(result=>{
            return result
        }).catch(error => {
            throw new HttpException( error.message, error.status );
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Get('/findbyid/:id')
    findById(@Param('id') id: number) {
        return this.userService.findById(id).then(result=>{
            return result
        }).catch(error => {
            throw new HttpException( error.message, error.status );
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Patch(':id')
    update(@Body() data: UpdateUserDto, @GetTokenValues() token: TokenDto) {
        data.id = token.data.id
        return this.userService.update(data).then(()=>{
            return {status:"Ok"}
        }).catch(error => {
            throw new HttpException( error.message, error.status );
        })
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Put('/updatepassword')
    updatePassword(@Body() data: UpdateUserPasswordDto, @GetTokenValues() token: TokenDto) {
        if(data.password){
            data.id = token.data.id
            const salt    = bcrypt.genSaltSync()
            data.password = bcrypt.hashSync(data.password, salt)
            return this.userService.updatePassword(data).then(()=>{
                return {status:"Ok"}
            }).catch(error => {
                throw new HttpException( error.message, error.status );
            })
        } else {
            return {status:"Error"}
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Patch('/updatestatus/:id')
    updateStatus(@Param('id') id: number, @Body() data: UpdateUserStatusDto) {
        return this.userService.updateStatus(data).then(()=>{
            return {status:"Ok"}
        }).catch(error => {
            throw new HttpException( error.message, error.status );
        })
    }
    
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('access-token')
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
