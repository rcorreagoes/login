import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto, ReturnDataTokenDto } from './dto/auth.dto';
const bcrypt  = require('bcrypt')

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
                private readonly userRepository: Repository<User>) {}

    async login(data: AuthDto): Promise<any>{
        return this.userRepository.findOne({where: {email: data.email}}).then(async result=>{
            if(!result){
                return { status: "No match" };
            }

            if(bcrypt.compareSync(data.password, result.password)){
                let returnData: ReturnDataTokenDto = result               
                return returnData
            } else {
                return {status: "Invalid email or password"}
            }      
        })
    }
}
