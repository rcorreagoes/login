import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserPasswordDto, UpdateUserStatusDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User)
                private readonly userRepository: Repository<User>) {}

    async create(createUserDto: CreateUserDto): Promise<any> {
        return await this.userRepository.save(createUserDto)
    }

    async findAll(): Promise<any> {
        return await this.userRepository.find({order:{name:'ASC'}});
    }

    async findByEmail(email: string): Promise<any> {
        return await this.userRepository.findOne({where:{email:email}});
    }

    async findById(id: number): Promise<any> {
        return await this.userRepository.findOne({where:{id:id}});
    }

    async update(updateUserDto: UpdateUserDto): Promise<any> {
        return await this.userRepository.update(updateUserDto.id, updateUserDto)
    }

    async updatePassword(data: UpdateUserPasswordDto): Promise<any> {
        return await this.userRepository.update(data.id, data)
    }

    async updateStatus(updateUserStatusDto: UpdateUserStatusDto): Promise<any> {
        return await this.userRepository.update(updateUserStatusDto.id, updateUserStatusDto)
    }

    async remove(id: number): Promise<any>{
        return await this.userRepository.delete(+id)
    }
}
